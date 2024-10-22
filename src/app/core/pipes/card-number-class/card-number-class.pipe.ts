import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumberClass'
})
export class CardNumberClassPipe implements PipeTransform {

  transform(cardType: string): string {
    if (cardType == 'Дебетовая карта') return 'debit-card__number';

    return 'credit-card__number';
  }

}
