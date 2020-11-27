import { Location } from '@app/interfaces/location';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-details',
  template: `
    <ion-card *ngIf="location">
      <ion-card-header>
        <ion-card-subtitle *ngIf="location.country">
          {{ location.country }}
        </ion-card-subtitle>
        <ion-card-title>{{ location.title }}</ion-card-title>
      </ion-card-header>
      <ion-item>
        <ion-icon name="pin" slot="start"></ion-icon>
        <ion-label>ion-item in a card, icon left, button right</ion-label>
        <ion-button slot="end" routerLink="/details/location/{{ location.id }}"
          >View</ion-button
        >
      </ion-item>
    </ion-card>
  `,
  styles: [``]
})
export class LocationDetailsComponent implements OnInit {
  @Input() location: Location;
  constructor() {}

  ngOnInit() {}
}
