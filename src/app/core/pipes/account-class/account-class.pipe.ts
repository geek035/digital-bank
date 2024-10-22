import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountClass'
})
export class AccountClassPipe implements PipeTransform {

  transform(accountName: string): string {
    if (accountName == 'Текущий счёт') {
      return 'current-account';
    } else if (accountName.includes('Карточный счёт')) {
      return 'card-account';
    }

    return 'savings-account';
  }

}
