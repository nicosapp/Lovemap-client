import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationsPageRoutingModule } from './locations-routing.module';

import { LocationsPage } from './locations.page';

import { LocationListItemComponent } from '@app/components/locations/location-list-item.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LocationsPageRoutingModule],
  declarations: [LocationsPage, LocationListItemComponent]
})
export class LocationsPageModule {}
