import { Location } from '@app/interfaces/location';
import { map } from 'rxjs/operators';
import { ApiLocationsService } from '@app/services/store/api-locations.service';
import { MapService } from '@app/services/store/map.service';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import { GoogleMapsMapTypeId } from '@ionic-native/google-maps';
import { ActionSheetController, Platform } from '@ionic/angular';
import { from, combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss']
})
export class MapPage implements OnInit, OnDestroy {
  @ViewChild('map_canvas') mapCanvas: ElementRef;

  private locations: Location[];
  private locationSubscription: Subscription;

  constructor(
    private platform: Platform,
    public actionCtrl: ActionSheetController,
    public mapService: MapService,
    private apiLocations: ApiLocationsService
  ) {
    if (this.platform.is('cordova')) {
      this.loadMap();
    }
  }

  ngOnInit() {
    // this.locationSubscription = this.apiLocations.locationsSubject.subscribe(
    //   (locations) => {
    //     this.locations = locations;
    //     console.log(locations);
    //   }
    // );

    console.log('before get');

    this.locationSubscription = combineLatest([
      this.mapService.mapReadySubject,
      this.apiLocations.locationsSubject
    ])
      .pipe(
        map(([first, second]) => {
          console.log('READY', first);
          return { ready: first, locations: second };
        })
      )
      .subscribe((result) => {
        if (result.ready && result.locations.length > 0) {
          this.locations = result.locations;
          this.mapService.handleNewMarker();
          this.mapService.setMarkers(this.locations);
        }
      });
    this.apiLocations.emitLocations();
  }

  ngOnDestroy(): void {
    this.locationSubscription.unsubscribe();
  }

  async loadMap() {
    this.mapService.loadMap();
  }

  changePosition() {
    const { lat, lng } = this.locations[2];
    this.mapService.setTarget({ lat, lng });
  }

  async mapOptions() {
    const actionSheet = await this.actionCtrl.create({
      buttons: [
        {
          text: 'Satellite',
          icon: 'earth-outline',
          handler: () => {
            console.log('Satellite clicked');
            this.mapService.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);
          }
        },
        {
          text: 'Plan',
          icon: 'map-outline',
          handler: () => {
            console.log('Plan clicked');
            this.mapService.setMapTypeId(GoogleMapsMapTypeId.NORMAL);
          }
        },
        {
          text: 'Ground',
          icon: 'image-outline',
          handler: () => {
            console.log('Ground clicked');
            this.mapService.setMapTypeId(GoogleMapsMapTypeId.TERRAIN);
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

  // locations = [
  //   { id: 1, lat: -31.56391, lng: 147.154312 },
  //   { id: 2, lat: -33.727111, lng: 150.371124 },
  //   { id: 3, lat: -33.718234, lng: 150.363181 },
  //   { id: 4, lat: -33.848588, lng: 151.209834 },
  //   { id: 5, lat: -33.851702, lng: 151.216968 },
  //   { id: 6, lat: -34.671264, lng: 150.863657 },
  //   { id: 7, lat: -35.304724, lng: 148.662905 },
  //   { id: 8, lat: -36.817685, lng: 175.699196 },
  //   { id: 9, lat: -36.828611, lng: 175.790222 },
  //   { id: 10, lat: -37.75, lng: 145.116667 },
  //   { id: 11, lat: -37.759859, lng: 145.128708 },
  //   { id: 12, lat: -37.765015, lng: 145.133858 },
  //   { id: 13, lat: -37.770104, lng: 145.143299 },
  //   { id: 14, lat: -37.7737, lng: 145.145187 },
  //   { id: 15, lat: -37.774785, lng: 145.137978 },
  //   { id: 16, lat: -37.819616, lng: 144.968119 },
  //   { id: 17, lat: -38.330766, lng: 144.695692 },
  //   { id: 18, lat: -39.927193, lng: 175.053218 },
  //   { id: 19, lat: -41.330162, lng: 174.865694 },
  //   { id: 20, lat: -42.734358, lng: 147.439506 },
  //   { id: 21, lat: -42.734358, lng: 147.501315 },
  //   { id: 22, lat: -42.735258, lng: 147.438 },
  //   { id: 23, lat: -43.999792, lng: 170.463352 }
  // ];
}
