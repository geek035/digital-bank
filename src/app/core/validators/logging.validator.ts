import { AbstractControl, ValidatorFn } from '@angular/forms';

export function loginValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isEmailPatter = /.*@.*/g;
    if (isEmailPatter.test(value)) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(value) ? null : { invalidEmail: true };
    }

    const loginPattern = /^[a-zA-Z0-9_]{1,}$/;

    return loginPattern.test(value) ? null : { invalidUsername: true }; 
  };
}
