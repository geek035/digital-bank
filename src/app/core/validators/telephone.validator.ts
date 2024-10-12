import { AbstractControl, ValidatorFn } from '@angular/forms';

export function telephoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;

    return value.length == 10 ? null : { invalidPhone: true };
  };
}
