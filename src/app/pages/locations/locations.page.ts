import { Location } from '@app/interfaces/location';
import { Observable } from 'rxjs';
import { ApiLocationsService } from '@app/services/store/api-locations.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss']
})
export class LocationsPage implements OnInit {
  private selectedLocation: Location;
  private searchBar: boolean = false;

  constructor(private apiLocations: ApiLocationsService) {}

  ngOnInit() {
    this.apiLocations.getLocations();
  }
}
