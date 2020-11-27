import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationEditorPageRoutingModule } from './location-editor-routing.module';

import { LocationEditorPage } from './location-editor.page';

import { UiComponentsModule } from '@app/modules/ui-components.module';
import { LayoutModule } from '@app/modules/layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationEditorPageRoutingModule,
    UiComponentsModule,
    LayoutModule
  ],
  declarations: [LocationEditorPage]
})
export class LocationEditorPageModule {}
