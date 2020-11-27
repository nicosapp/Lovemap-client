import { MapService } from '@app/services/store/map.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LocationService,
  MyLocation,
  GoogleMapsAnimation,
  HtmlInfoWindow,
  MarkerIcon,
  Geocoder,
  GeocoderResult,
  BaseArrayClass,
  ILatLng
} from '@ionic-native/google-maps';
import {
  ActionSheetController,
  Platform,
  AlertController
} from '@ionic/angular';
import { environment as env } from '@app/../environments/environment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit {
  @ViewChild('map_canvas') mapCanvas: ElementRef;
  map: GoogleMap;
  marker: Marker;

  constructor(
    public actionCtrl: ActionSheetController,
    private platform: Platform,
    public mapService: MapService
  ) {
    if (this.platform.is('cordova')) {
      this.loadMap();
    }
  }

  async loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: env.GOOGLE_MAPS_API,
      API_KEY_FOR_BROWSER_DEBUG: env.GOOGLE_MAPS_API
    });
    LocationService.getMyLocation().then((myLoc: MyLocation) => {
      console.log(myLoc);
      let options: GoogleMapOptions = {
        camera: {
          // target: myLoc.latLng,
          target: this.locations[0],
          zoom: 12,
          tilt: 0
        }
      };
      this.map = GoogleMaps.create('map_canvas', options);
      this.map.setMyLocationEnabled(true);
      this.map.setMyLocationButtonEnabled(true);
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.mapService.setMarker(this.map);
        this.mapService.setMarkers(this.map, this.locations);
      });
    });
  }

  async mapOptions() {
    const actionSheet = await this.actionCtrl.create({
      buttons: [
        {
          text: 'Satellite',
          icon: 'earth-outline',
          handler: () => {
            console.log('Satellite clicked');
            this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
          }
        },
        {
          text: 'Plan',
          icon: 'map-outline',
          handler: () => {
            console.log('Plan clicked');
            this.map.setMapTypeId(GoogleMapsMapTypeId.NORMAL);
          }
        },
        {
          text: 'Ground',
          icon: 'image-outline',
          handler: () => {
            console.log('Ground clicked');
            this.map.setMapTypeId(GoogleMapsMapTypeId.TERRAIN);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close-outline',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  ngOnInit() {}

  locations = [
    { id: 1, lat: -31.56391, lng: 147.154312 },
    { id: 2, lat: -33.727111, lng: 150.371124 },
    { id: 3, lat: -33.718234, lng: 150.363181 },
    { id: 4, lat: -33.848588, lng: 151.209834 },
    { id: 5, lat: -33.851702, lng: 151.216968 },
    { id: 6, lat: -34.671264, lng: 150.863657 },
    { id: 7, lat: -35.304724, lng: 148.662905 },
    { id: 8, lat: -36.817685, lng: 175.699196 },
    { id: 9, lat: -36.828611, lng: 175.790222 },
    { id: 10, lat: -37.75, lng: 145.116667 },
    { id: 11, lat: -37.759859, lng: 145.128708 },
    { id: 12, lat: -37.765015, lng: 145.133858 },
    { id: 13, lat: -37.770104, lng: 145.143299 },
    { id: 14, lat: -37.7737, lng: 145.145187 },
    { id: 15, lat: -37.774785, lng: 145.137978 },
    { id: 16, lat: -37.819616, lng: 144.968119 },
    { id: 17, lat: -38.330766, lng: 144.695692 },
    { id: 18, lat: -39.927193, lng: 175.053218 },
    { id: 19, lat: -41.330162, lng: 174.865694 },
    { id: 20, lat: -42.734358, lng: 147.439506 },
    { id: 21, lat: -42.734358, lng: 147.501315 },
    { id: 22, lat: -42.735258, lng: 147.438 },
    { id: 23, lat: -43.999792, lng: 170.463352 }
  ];
}
