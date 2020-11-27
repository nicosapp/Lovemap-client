import { CustomValidators } from '@app/helpers/custom-validators';
import { AuthService } from '@app/services/http/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  template: `
    <form [formGroup]="signupForm" (ngSubmit)="signup()">
      <app-text-field
        name="email"
        label="Email"
        type="text"
        [clearable]="true"
        formControlName="email"
      ></app-text-field>
      <app-text-field
        name="name"
        label="Name"
        type="text"
        [clearable]="true"
        formControlName="name"
      ></app-text-field>
      <app-text-field
        name="password"
        label="Password"
        type="password"
        [visibility]="true"
        formControlName="password"
      ></app-text-field>
      <app-text-field
        name="password_confirmation"
        label="Confirmation"
        type="password"
        [visibility]="true"
        formControlName="password_confirmation"
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
          Sign Up
          <ion-spinner
            *ngIf="loading"
            class="ml-4"
            name="crescent"
          ></ion-spinner>
        </ion-button>
      </div>
    </form>
    <div class="ion-text-center mt-8">
      Already an account ?
      <ion-router-link color="primary" href="/signin" routeDirection="root"
        >Sign in here
      </ion-router-link>
    </div>
  `,
  styles: [``]
})
export class RegisterFormComponent implements OnInit {
  private signupForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, CustomValidators.email]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.hasNumber,
        CustomValidators.hasCapitalCase,
        CustomValidators.hasSmallCase,
        CustomValidators.hasSpecialCharacters
      ]),
      password_confirmation: new FormControl('', Validators.required)
    },
    {
      validators: CustomValidators.passwordMatchValidator
    }
  );
  private loading: boolean = false;

  get disabled() {
    return this.loading || this.signupForm.invalid;
  }
  constructor(private router: Router, private auth: AuthService) {}

  async signup() {
    const credentials = this.signupForm.value;
    this.loading = true;
    try {
      await this.auth.signUp(credentials);
    } catch (e) {}
    this.loading = false;
  }

  ngOnInit(): void {}
}
