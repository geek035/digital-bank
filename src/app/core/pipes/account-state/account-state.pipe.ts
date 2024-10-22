import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountState'
})
export class AccountStatePipe implements PipeTransform {

  transform(accountState: string | undefined): unknown {
    switch (accountState) {
      case 'Active':
        return 'активен';

      case 'Blocked':
        return 'заблокирован';

      case 'Created':
        return 'не активен';

      default:
        return 'неизвестное состояние';
    }
  }

}
