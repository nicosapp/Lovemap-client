import { Observable } from 'rxjs';
import { Location } from '@app/interfaces/location';
import { ApiLocationsService } from '@app/services/store/api-locations.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss']
})
export class DetailsPage implements OnInit {
  private model: string;
  private location$: Observable<Location>;

  constructor(
    private route: ActivatedRoute,
    private apiLocation: ApiLocationsService
  ) {}

  ngOnInit() {
    this.model = this.route.snapshot.paramMap.get('model');
    if (this.model === 'location') this.getLocation();
  }

  private getLocation(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.location$ = this.apiLocation.show(id);
  }
}
