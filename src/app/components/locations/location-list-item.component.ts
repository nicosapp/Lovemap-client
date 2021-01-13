import { Router } from '@angular/router';
import { MapService } from '@app/services/store/map.service';
import { AlertService } from '@app/services/helpers/alert.service';
import { Location } from '@app/interfaces/location';
import { ApiLocationsService } from '@app/services/store/api-locations.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location-list-item',
  template: `
    <ion-item-sliding>
      <ion-item routerLink="/details/location/{{ location.id }}" lines="full">
        <ion-avatar slot="start">
          <img
            src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
          />
        </ion-avatar>
        <ion-label class="ion-text-wrap">
          <h3>{{ location.title }}</h3>
          <p>Partners</p>
          <p>City - Country</p>
        </ion-label>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option color="primary" (click)="viewOnMap()">
          <ion-icon slot="icon-only" name="location"></ion-icon>
        </ion-item-option>
        <ion-item-option color="danger" (click)="destroy()">
          <ion-icon slot="icon-only" name="trash"></ion-icon>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  `,
  styles: [``]
})
export class LocationListItemComponent implements OnInit {
  @Input() location: Location;
  constructor(
    private apiLocation: ApiLocationsService,
    private mapService: MapService,
    private alert: AlertService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  private destroy(): void {
    this.alert.confirm({
      title: 'Delete!',
      message: 'Do you really want to delete this location?',
      okFunction: () => {
        this.apiLocation.delete(this.location);
      }
    });
  }

  private viewOnMap(): void {
    if (this.mapService.mapReady) {
      this.mapService.setTarget({
        lat: this.location.lat,
        lng: this.location.lng
      });
      this.router.navigateByUrl('/tabs/map');
    } else {
      this.alertService.popup({
        message: 'Please navigate to map tab before selecting a location'
      });
    }
  }
}
