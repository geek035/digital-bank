import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber'
})
export class CardNumberPipe implements PipeTransform {

  transform(cardNumber: string, hidenNumber: boolean = false): string {
    if (!cardNumber) return '';
  
    let formattedNumber = cardNumber.replace(/\d{4}(?=\d)/g, '$& ');

    if (hidenNumber) formattedNumber = formattedNumber.replace(/\d{4} (?=\d)/g, '**** ');
    return formattedNumber;
  }

}
