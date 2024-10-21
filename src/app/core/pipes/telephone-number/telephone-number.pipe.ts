import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephoneNumber'
})
export class TelephoneNumberPipe implements PipeTransform {

  transform(phone: string): string {
    if (phone.length !== 12 || !phone.startsWith('+')) {
      return phone; 
    }

    const prefix = phone.slice(0, 2);      
    const areaCode = phone.slice(2, 5);    
    const firstPart = phone.slice(5, 8);   
    const secondPart = phone.slice(8, 10); 
    const thirdPart = phone.slice(10, 12);

    return `${prefix}(${areaCode})${firstPart}-${secondPart}-${thirdPart}`;
  }

}
