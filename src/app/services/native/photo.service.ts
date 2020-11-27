import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = 'photos';
  currentImage: any;

  constructor(private platform: Platform, private camera: Camera) {}

  public takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.currentImage = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        // Handle error
        console.log('Camera issue:' + err);
      }
    );
  }
}

export interface Photo {
  filepath: string;
  webviewPath: string;
}
