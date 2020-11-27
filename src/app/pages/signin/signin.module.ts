import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninPageRoutingModule } from './signin-routing.module';

import { SigninPage } from './signin.page';

import { UiComponentsModule } from '@app/modules/ui-components.module';
import { LayoutModule } from '@app/modules/layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SigninPageRoutingModule,
    UiComponentsModule,
    LayoutModule
  ],
  declarations: [SigninPage]
})
export class SigninPageModule {}
