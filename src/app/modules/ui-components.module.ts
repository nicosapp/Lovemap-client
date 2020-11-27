import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginFormComponent } from '@app/components/forms/login-form.component';
import { RegisterFormComponent } from '@app/components/forms/register-form.component';

import { MaterialModule } from '@app/modules/material.module';
import { RatingComponent } from '@app/components/ui-components/rating.component';

const declarations = [
  LoginFormComponent,
  RegisterFormComponent,
  RatingComponent
];

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ...declarations
  ]
})
export class UiComponentsModule {}
