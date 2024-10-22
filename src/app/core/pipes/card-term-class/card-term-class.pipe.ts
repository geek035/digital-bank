import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardTermClass'
})
export class CardTermClassPipe implements PipeTransform {

  transform(cardType: string): string {
    if (cardType == 'Дебетовая карта') return 'debit-card__term';

    return 'credit-card__term';
  }

}
