import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardClass'
})
export class CardClassPipe implements PipeTransform {

  transform(cardType: string): string {
    if (cardType == 'Дебетовая карта') return 'debit-card';

    return 'credit-card';
  }

}
