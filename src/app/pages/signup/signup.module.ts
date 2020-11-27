import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';

import { UiComponentsModule } from '@app/modules/ui-components.module';
import { LayoutModule } from '@app/modules/layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    UiComponentsModule,
    LayoutModule
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}
