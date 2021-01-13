import { Location } from '@app/interfaces/location';
import { Observable, Subscription } from 'rxjs';
import { ApiLocationsService } from '@app/services/store/api-locations.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss']
})
export class LocationsPage implements OnInit, OnDestroy {
  private selectedLocation: Location;
  private searchBar: boolean = false;

  private locations: Location[];
  private locationSubscription: Subscription;

  constructor(private apiLocations: ApiLocationsService) {}

  ngOnDestroy(): void {
    this.locationSubscription.unsubscribe();
  }

  ngOnInit() {
    this.locationSubscription = this.apiLocations.locationsSubject.subscribe(
      (locations) => {
        this.locations = locations;
      }
    );
    this.apiLocations.emitLocations();
  }
}
