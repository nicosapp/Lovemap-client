import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormControl
} from '@angular/forms';

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('password_confirmation').value; // get password from our confirmPassword form control
    // compare is the password math
    const error = { NoPasswordMatch: true };
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('password_confirmation').setErrors(error);
      return password === confirmPassword ? null : error;
    }
  }
  static email(c: FormControl) {
    // let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return CustomValidators.patternValidator(/.+@.+\..+/, { email: true })(c);
  }
  static hasNumber(c: FormControl) {
    return CustomValidators.patternValidator(/\d/, { hasNumber: true })(c);
  }

  static hasCapitalCase(c: FormControl) {
    return CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true })(
      c
    );
  }

  static hasSmallCase(c: FormControl) {
    return CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true })(
      c
    );
  }

  static hasSpecialCharacters(c: FormControl) {
    return CustomValidators.patternValidator(/^(?=.*[!@#$%^&*])/, {
      hasSpecialCharacters: true
    })(c);
  }
}
