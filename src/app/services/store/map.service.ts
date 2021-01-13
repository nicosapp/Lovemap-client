import { AlertService } from '@app/services/helpers/alert.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@app/interfaces/location';
import { ModalController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import {
  CameraPosition,
  Environment,
  Geocoder,
  GoogleMap,
  GoogleMaps,
  GoogleMapsAnimation,
  GoogleMapsEvent,
  HtmlInfoWindow,
  ILatLng,
  LocationService,
  Marker,
  MarkerCluster,
  MarkerClusterIcon,
  MarkerClusterOptions,
  MarkerIcon,
  MarkerLabel,
  MyLocation
} from '@ionic-native/google-maps';
import {
  markerNewHtmlInfo,
  markerViewHtmlInfo,
  iconNew,
  iconExisting,
  clusterIcons
} from './mapConfig';
import { LocationEditorPage } from '@app/pages/location-editor/location-editor.page';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  marker: Marker;
  map: GoogleMap;
  mapReady: boolean = false;
  markerCluster: MarkerCluster;

  mapReadySubject = new Subject<Boolean>();

  private htmlInfoWindow: HtmlInfoWindow;
  private myLoc: MyLocation;

  constructor(
    public modalController: ModalController,
    public alertService: AlertService,
    private router: Router
  ) {}

  public loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: env.GOOGLE_MAPS_API,
      API_KEY_FOR_BROWSER_DEBUG: env.GOOGLE_MAPS_API
    });
    return LocationService.getMyLocation().then((myLoc: MyLocation) => {
      this.myLoc = myLoc;
      this.map = GoogleMaps.create('map_canvas', {});

      this.map.setMyLocationEnabled(true);
      this.map.setMyLocationButtonEnabled(true);
      return this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.setTargetMyLocation();
        this.mapReady = true;
        this.mapReadySubject.next(this.mapReady);
      });
    });
  }

  public setTargetMyLocation() {
    this.setTarget(this.myLoc.latLng);
  }

  public setTarget(target: ILatLng) {
    const cameraPosition: CameraPosition<ILatLng> = {
      target: target,
      zoom: 9,
      tilt: 0
    };
    this.map.moveCamera(cameraPosition);
  }

  public handleNewMarker(): void {
    this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe((latLng) => {
      if (this.marker) this.marker.remove();

      this.marker = this.map.addMarkerSync({
        // title: 'Love location!',
        // snippet: '',
        icon: iconNew,
        animation: GoogleMapsAnimation.DROP,
        position: latLng[0]
        // position: this.map.getCameraPosition().target
      });

      this.setHtmlInfoContent(this.marker, markerNewHtmlInfo, () => {
        this.modalLocation();
      });
      this.marker.showInfoWindow();

      this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(async () => {
        this.setHtmlInfoContent(this.marker, markerNewHtmlInfo, () => {
          this.modalLocation();
        });
      });
    });
  }

  setMarkers(locations: any) {
    const markerOptions = locations.map((location, i) => {
      return {
        position: {
          lat: location.lat,
          lng: location.lng
        },
        icon: iconExisting
      };
    });
    // console.log(markerOptions);
    let options: MarkerClusterOptions = {
      markers: markerOptions,
      icons: clusterIcons,
      boundsDraw: true,
      maxZoomLevel: 15
    };

    this.markerCluster = this.map.addMarkerClusterSync(options);
    this.markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
      let marker: Marker = params[1];
      const position = marker.getPosition();
      const location = locations.find(
        (loc) => loc.lat === position.lat && loc.lng === position.lng
      );
      console.log(location);
      this.setHtmlInfoContent(marker, markerViewHtmlInfo, () => {
        this.goToLocationDetails(location.id);
      });
    });
  }

  setMapTypeId(id) {
    this.map.setMapTypeId(id);
  }

  setHtmlInfoContent(
    marker: Marker,
    markerHtmlInfo: string,
    clickFunction: Function
  ) {
    let frame: HTMLElement = document.createElement('div');
    frame.innerHTML = markerHtmlInfo;
    frame.getElementsByTagName('button')[0].addEventListener('click', () => {
      clickFunction();
    });
    if (!this.htmlInfoWindow) this.htmlInfoWindow = new HtmlInfoWindow();
    this.htmlInfoWindow.setContent(frame);
    this.htmlInfoWindow.open(marker);
  }

  async getAddress(position: ILatLng) {
    let result: any = { country: null, locality: null };
    if (env.GEOCODER_API_ACTIVE) {
      try {
        const response: any = await Geocoder.geocode({ position });
        result = response.length ? response[0] : result;
      } catch (e) {}
    }

    console.log(result);
    return result;
  }

  async modalLocation() {
    const defaultPosition = { lat: 45.467071066442365, lng: 4.384392393115224 };
    const latLng = env.GOOGLE_MAPS_API_ACTIVE
      ? this.marker.getPosition()
      : defaultPosition;
    const address = await this.getAddress(latLng);
    const modal = await this.modalController.create({
      component: LocationEditorPage,
      cssClass: 'location-editor',
      componentProps: {
        latLng,
        address
      }
    });
    modal.onWillDismiss().then((res: any) => {
      const { data } = res;
      if (data.success) this.marker.remove();
      this.alertService.popup({
        title: 'Success!',
        message: 'You location is now saved!'
      });
    });
    return await modal.present();
  }

  goToLocationDetails(id) {
    console.log(id);
    this.router.navigateByUrl(`/details/location/${id}`);
  }
}
