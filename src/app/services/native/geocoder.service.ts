import { Injectable } from '@angular/core';
import {
  Geocoder,
  GeocoderResult,
  BaseArrayClass,
  ILatLng
} from '@ionic-native/google-maps';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {
  constructor() {}

  getAddress(position: ILatLng) {
    // Geocoder.geocode({
    //   "position": latLng
    // }).then((results: GeocoderResult[]) => {
    //   if (results.length == 0) {
    //     // Not found
    //     return null;
    //   }
    //   let address: any = [
    //     results[0].subThoroughfare || "",
    //     results[0].thoroughfare || "",
    //     results[0].locality || "",
    //     results[0].adminArea || "",
    //     results[0].postalCode || "",
    //     results[0].country || ""].join(", ");
  }

  getPosition(address: string) {
    //     Geocoder.geocode({
    //   "address": address
    // }).then((results: GeocoderResult[]) => {
    //   console.log(results);
    //   if (!results.length) {
    //     this.isRunning = false;
    //     return null;
    //   }
    //   // Add a marker
    //   let marker: Marker = this.map1.addMarkerSync({
    //     'position': results[0].position,
    //     'title':  JSON.stringify(results[0].position)
    //   });
    //   // Move to the position
    //   this.map1.animateCamera({
    //     'target': marker.getPosition(),
    //     'zoom': 17
    //   }).then(() => {
    //     marker.showInfoWindow();
    //     this.isRunning = false;
    //   });
    // });
  }
}
