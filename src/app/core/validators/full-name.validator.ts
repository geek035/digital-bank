import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;
    const fullNamePatter = /^[а-яА-Я-]+$/
    return fullNamePatter.test(value) ? null : { invalidFullName: true };
  };
}
