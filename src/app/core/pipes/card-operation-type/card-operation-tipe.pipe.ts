import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardOperationTipe'
})
export class CardOperationTipePipe implements PipeTransform {

  transform(cardOperationState: string): string {
    switch (cardOperationState) {
      case 'Created':
        return 'карта создана';
      
      case 'BeingProduced':
        return 'карта выпущена';

      case 'Delivered':
        return 'карта доставлена';
      
      case 'Delivery':
        return 'карта в доставке';
      
      case 'Issued':
        return 'карта выпущена';
      
      case 'Produced':
        return 'карта произведена';
      
      case 'Rejected':
        return 'запрос отменен';
      
      default:
        return 'неизвестное состояние';
    }
  }

}
