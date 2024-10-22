import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardState'
})
export class CardStatePipe implements PipeTransform {

  transform(cardState: string): string {
    switch (cardState) {
      case 'Created':
        return 'Карта создана';

      case 'Active':
        return 'Карта активна';

      case 'Locked':
        return 'Карта заблокирована';

      default:
        return 'Неизвестное состояние карты';
    }
  }

}
