import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyIcon'
})
export class CurrencyIconPipe implements PipeTransform {

  transform(currencyCode: number | undefined): unknown {
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
