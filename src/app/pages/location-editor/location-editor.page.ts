// import { PhotoService } from '@app/services/native/photo.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

import * as moment from 'moment';
import { GeocoderResult, ILatLng } from '@ionic-native/google-maps';
import { ApiLocationsService } from '@app/services/store/api-locations.service';

@Component({
  selector: 'app-location-editor',
  templateUrl: './location-editor.page.html',
  styles: [
    `
      ion-button.btn-upload::part(native) {
        border-color: var(--ion-color-light-shade) !important;
      }
    `
  ]
})
export class LocationEditorPage implements OnInit {
  @Input() latLng: ILatLng;
  @Input() address: GeocoderResult;
  private locationForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    comment: new FormControl(''),
    partner: new FormControl(),
    context: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    duration: new FormControl(),
    rating: new FormControl('0')
  });
  private loading: boolean = false;

  constructor(
    public modalCtrl: ModalController,
    public actionCtrl: ActionSheetController,
    public apiLocation: ApiLocationsService // public photoService: PhotoService
  ) {}

  ngOnInit() {}

  save() {
    let location = this.locationForm.value;
    const { date, time } = location;
    location = {
      ...location,
      ...{ date: date ? moment(date).format('YYYY-MM-DD') : null },
      ...{ time: time ? moment(time).format('HH:mm') : null },
      ...{ country: this.address.country, city: this.address.locality },
      ...{ lat: this.latLng.lat, lng: this.latLng.lng }
    };
    console.log(location);
    this.loading = true;
    this.apiLocation.store(location).subscribe(() => {
      this.loading = false;
      this.modalCtrl.dismiss({ success: true });
    });
    // console.log(location);
  }
  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  async uploadImage() {
    const actionSheet = await this.actionCtrl.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            console.log('Take a picture clicked');
            // this.map.setMapTypeId(GoogleMapsMapTypeId.SATELLITE);`
            // this.photoService.takePicture();
          }
        },
        {
          text: 'Upload',
          icon: 'cloud-upload',
          handler: () => {
            console.log('Upload clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
}
