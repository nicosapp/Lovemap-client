import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';

import { LocationDetailsComponent } from '@app/components/locations/location-details.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DetailsPageRoutingModule],
  declarations: [DetailsPage, LocationDetailsComponent]
})
export class DetailsPageModule {}
