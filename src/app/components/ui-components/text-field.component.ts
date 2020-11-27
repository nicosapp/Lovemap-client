import {
  Component,
  OnInit,
  Input,
  Optional,
  Self,
  Injector
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-text-field',
  styles: [
    `
      :host {
        display: block;
      }
      .mat-form-field {
        margin-bottom: 8px;
      }
    `
  ],
  template: `
    <mat-form-field
      appearance="fill"
      class="full-width"
      [ngClass]="{ textarea: textarea, 'hide-details': hideDetails }"
    >
      <mat-label>{{ label }} </mat-label>
      <textarea
        *ngIf="textarea"
        matInput
        cdkTextareaAutosize
        cdkAutosizeMinRows="2"
        [formControl]="_control.control"
        [(ngModel)]="value"
        [placeholder]="placeholder"
        (blur)="onTouched()"
      ></textarea>
      <input
        *ngIf="!textarea"
        matInput
        [formControl]="_control.control"
        [(ngModel)]="value"
        [placeholder]="placeholder"
        [required]="required"
        [type]="type"
        (blur)="onTouched()"
      />
      <span *ngIf="prefix" matSuffix>{{ prefix }}</span>
      <span *ngIf="suffix" matSuffix>{{ suffix }}</span>
      <button
        mat-button
        type="button"
        *ngIf="value && clearable"
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="value = ''"
      >
        <mat-icon>close</mat-icon>
      </button>

      <button
        mat-button
        *ngIf="visibility"
        type="button"
        matSuffix
        mat-icon-button
        aria-label="visibility"
        (click)="toggleVisibility()"
      >
        <mat-icon>{{ visibilityIcon }}</mat-icon>
      </button>
      <mat-error *ngIf="showError">
        {{ errors[0] }}
      </mat-error>
    </mat-form-field>
  `
})
export class TextFieldComponent implements OnInit, ControlValueAccessor {
  @Input() type: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() errorMessages?: Object;
  @Input() clearable?: boolean;
  @Input() visibility?: boolean;
  @Input() textarea?: boolean = false;
  @Input() suffix?: string;
  @Input() prefix?: string;
  @Input() required?: boolean;
  @Input() hideDetails?: boolean;

  private disabled: boolean;

  @Input()
  get value() {
    return this._value;
  }

  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      this.onChanged(value);
    }
  }
  private _value: any;

  private onTouched = () => {};
  private onChanged = (_: any) => {};

  writeValue(obj: any): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private _errorMessages: Object;

  constructor(
    private injector: Injector,
    @Self() @Optional() private control: NgControl
  ) {
    this.control.valueAccessor = this;
    this._errorMessages = {
      required: () => `${this.label} is required.`,
      email: () => `Your email is invalid.`,
      hasNumber: () => `Must contain at least 1 number.`,
      hasCapitalCase: () => `Must contain at least 1 capital case.`,
      hasSmallCase: () => `Must contain at least 1 small case.`,
      hasSpecialCharacters: () => `Must contain at least 1 special character`,
      NoPasswordMatch: () => `Password does not match.`,
      minlength: (required) =>
        `${this.label} must be at least ${required} characters long.`
    };
  }

  get invalid(): boolean {
    return this.control ? this.control.invalid : false;
  }

  get showError(): boolean {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;
    // return this.invalid;
    return this.invalid ? dirty || touched : false;
  }

  get errors(): Array<string> {
    if (!this.control) {
      return [];
    }

    const { errors } = this.control;
    // console.log(errors);
    if (!errors) return [];

    const messages = { ...this._errorMessages, ...this.errorMessages };
    return Object.keys(errors).map((key) => {
      if (key in messages) {
        if (key === 'minlength' || key === 'maxlength')
          return messages[key](errors[key].requiredLength);
        return messages[key]();
      }
      return <string>errors[key] || key;
    });
  }

  private _control: NgControl;

  ngOnInit() {
    this._control = this.injector.get(NgControl);
  }

  private visibilityIcon = 'visibility_off';
  toggleVisibility() {
    this.type = this.type === 'text' ? 'password' : 'text';
    this.visibilityIcon =
      this.visibilityIcon === 'visibility' ? 'visibility_off' : 'visibility';
  }
}
