import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;
    const emailPatter = /^\w+@\w+$/;
    return emailPatter.test(value) ? null : { invalidEmail: true };
  };
}
