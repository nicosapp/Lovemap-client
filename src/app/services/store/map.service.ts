import { Router } from '@angular/router';
import { Location } from '@app/interfaces/location';
import { ModalController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import {
  Geocoder,
  GoogleMap,
  GoogleMapsAnimation,
  GoogleMapsEvent,
  HtmlInfoWindow,
  ILatLng,
  Marker,
  MarkerCluster,
  MarkerClusterIcon,
  MarkerClusterOptions,
  MarkerIcon,
  MarkerLabel
} from '@ionic-native/google-maps';
import {
  markerNewHtmlInfo,
  markerViewHtmlInfo,
  markerIconUrl,
  markerIconExistingUrl
} from './markerHtmlInfo';
import { LocationEditorPage } from '@app/pages/location-editor/location-editor.page';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  marker: Marker;
  markers: Marker[] = [];
  markerCluster: MarkerCluster;
  private icon = (icon): MarkerIcon => {
    return {
      url: icon,
      size: { width: 30, height: 30 }
    };
  };

  private htmlInfoWindow = new HtmlInfoWindow();

  constructor(
    public modalController: ModalController,
    private router: Router
  ) {}

  public setMarker(map: GoogleMap): void {
    map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe((latLng) => {
      console.log('Click MAP', latLng);
      if (this.marker) this.marker.remove();

      this.marker = map.addMarkerSync({
        // title: 'Love location!',
        // snippet: '',
        icon: this.icon(markerIconUrl),
        animation: GoogleMapsAnimation.DROP,
        position: latLng[0]
        // position: this.map.getCameraPosition().target
      });
      this.htmlInfoWindow.setContent(
        this.setNewHtmlInfo(markerNewHtmlInfo, () => {
          this.modalLocation();
        })
      );
      // this.marker.showInfoWindow();
      this.htmlInfoWindow.open(this.marker);

      this.marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(async () => {
        this.htmlInfoWindow.setContent(
          this.setNewHtmlInfo(markerNewHtmlInfo, () => {
            this.modalLocation();
          })
        );
        this.htmlInfoWindow.open(this.marker);
      });
    });
  }

  setMarkers(map: GoogleMap, locations: any) {
    let labelOptions: MarkerLabel = {
      bold: true,
      fontSize: 15,
      color: 'white'
    };
    let clusterIcons: MarkerClusterIcon[] = [
      {
        min: 2,
        max: 100,
        url: 'assets/icon/markerCluster/mBlue.png',
        anchor: { x: 16, y: 16 },
        label: labelOptions
      },
      {
        min: 100,
        max: 1000,
        url: 'assets/icon/markerCluster/mYellow.png',
        anchor: { x: 16, y: 16 },
        label: labelOptions
      },
      {
        min: 1000,
        max: 2000,
        url: 'assets/icon/markerCluster/mRed.png',
        anchor: { x: 24, y: 24 },
        label: labelOptions
      },
      {
        min: 2000,
        url: 'assets/icon/markerCluster/mMagenta.png',
        anchor: { x: 32, y: 32 },
        label: labelOptions
      }
    ];

    const markerOptions = locations.map((location, i) => {
      return {
        position: {
          lat: location.lat,
          lng: location.lng
        },
        title: location.id.toString(),
        icon: this.icon(markerIconExistingUrl)
      };
    });
    // console.log(markerOptions);
    let options: MarkerClusterOptions = {
      markers: markerOptions,
      icons: clusterIcons,
      boundsDraw: true,
      maxZoomLevel: 15
    };

    this.markerCluster = map.addMarkerClusterSync(options);
    this.markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
      let marker: Marker = params[1];

      this.htmlInfoWindow.setContent(
        this.setNewHtmlInfo(markerViewHtmlInfo, () => {
          const id = marker.getTitle();
          this.goToLocationDetails(id);
        })
      );
      this.htmlInfoWindow.open(marker);
      setTimeout(() => {
        marker.hideInfoWindow();
      }, 200);
    });
  }

  setNewHtmlInfo(markerHtmlInfo: string, clickFunction: Function) {
    let frame: HTMLElement = document.createElement('div');
    frame.innerHTML = markerHtmlInfo;
    frame.getElementsByTagName('button')[0].addEventListener('click', () => {
      clickFunction();
    });
    return frame;
  }

  async getAddress(position: ILatLng) {
    let result: any = { country: null, locality: null };
    if (env.GEOCODER_API) {
      try {
        const response: any = await Geocoder.geocode({ position });
        result = response.length ? response[0] : result;
      } catch (e) {}
    }

    console.log(result);
    return result;
  }

  async modalLocation() {
    const position = { lat: 45.467071066442365, lng: 4.384392393115224 };
    const address = await this.getAddress(position);
    const modal = await this.modalController.create({
      component: LocationEditorPage,
      cssClass: 'location-editor',
      componentProps: {
        // latLng: this.marker.getPosition()
        latLng: position,
        address
      }
    });
    return await modal.present();
  }

  goToLocationDetails(id) {
    console.log(id);
    this.router.navigateByUrl(`/details/location/${id}`);
  }
}
