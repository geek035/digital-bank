import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountOperationType'
})
export class AccountOperationTypePipe implements PipeTransform {

  transform(accountOperationState: string): string {
    switch (accountOperationState) {
      case 'Canceled':
        return 'операция отменена';

      case 'Completed':
        return 'операция завершена';
      
      case 'Hold':
        return 'операция обрабатывается';

      default:
        return 'неизвестный результат';
    }
  }

}
