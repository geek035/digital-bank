import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor() { }

  getCurrencyIcon(currencyCode: number): string {
    switch (currencyCode) {
      case 643:
        return 'currency_ruble';
      
      case 978:
        return 'euro';
      
      case 156:
        return 'currency_yuan'

      case 840:
        return 'attach_money';
      
      default:
        return 'payments';
    }
  }

}
