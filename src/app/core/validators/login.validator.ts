import { AbstractControl, ValidatorFn } from '@angular/forms';

export function loginValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;
    const loginPattern = /^[а-яА-Яa-zA-Z_0-9]+$/;

    return loginPattern.test(value) ? null : { forbiddenSymbols: true };
  };
}
