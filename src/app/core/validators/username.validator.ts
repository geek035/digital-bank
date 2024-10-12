import { AbstractControl, ValidatorFn } from '@angular/forms';

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;
    const usernamePatter = /^[а-яА-Яa-zA-Z_0-9]+$/;

    return usernamePatter.test(value) ? null : { forbiddenSymbols: true };
  };
}
