import { CustomValidators } from '@app/helpers/custom-validators';
import { AuthService } from '@app/services/http/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@app/services/helpers/toast.service';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  styles: [],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="signin()">
      <app-text-field
        name="email"
        label="Email"
        type="text"
        [clearable]="true"
        formControlName="email"
      ></app-text-field>
      <app-text-field
        name="password"
        label="Password"
        type="password"
        [visibility]="true"
        formControlName="password"
      ></app-text-field>
      <div>
        <ion-button
          size="large"
          [disabled]="disabled"
          color="primary"
          expand="block"
          type="submit"
          class="ion-text-capitalize"
        >
          <ng-template [ngIf]="!loading"> Sign in </ng-template>
          <ng-template [ngIf]="loading">
            <ion-spinner name="crescent"></ion-spinner>
          </ng-template>
        </ion-button>
      </div>
    </form>
    <div class="ion-text-center mt-8">
      No account ?
      <ion-router-link color="primary" href="/signup" routeDirection="root"
        >Create one here
      </ion-router-link>
    </div>
  `
})
export class LoginFormComponent implements OnInit {
  private loginForm = new FormGroup({
    email: new FormControl('nicolas.izac.app@gmail.com', [
      Validators.required,
      CustomValidators.email
    ]),
    password: new FormControl('Therom04!', [Validators.required])
  });
  private loading: boolean = false;

  get disabled() {
    return this.loading || this.loginForm.invalid;
  }
  constructor(
    private router: Router,
    private auth: AuthService,
    private toast: ToastService
  ) {}

  async signin() {
    const { email, password } = this.loginForm.value;
    this.loading = true;
    try {
      await this.auth.signIn({ email, password });
    } catch (e) {
      this.toast.show('Sorry! we found a problem :(');
    }
    this.loading = false;
  }

  ngOnInit() {}
}
