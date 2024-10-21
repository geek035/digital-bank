import { AbstractControl, ValidatorFn } from '@angular/forms';

export function amountTrasferValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const amount: number = +control.value;

    if (amount < 1 || 100_000 < amount) return { invalidAmount: true };

    return null;
  };
}
