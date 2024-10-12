import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;
    
    if (!/[А-ЯA-Z]/g.test(value)) {
      return { noCapitalLetter: true }
    }

    if (!/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/g.test(value)) {
      return { noSpecialSymbol: true }
    }

    return null;
  };
}
