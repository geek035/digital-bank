import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephoneNumber'
})
export class TelephoneNumberPipe implements PipeTransform {

  transform(phone: string): string {
    let phoneNumber = phone;
    if (!phoneNumber || phoneNumber.length < 11 || phoneNumber.length > 12) {
      return phoneNumber; 
    }

    if (phoneNumber.length == 11) {
      phoneNumber = "+" + phoneNumber;
    }

    const prefix = phoneNumber.slice(0, 2);  
    const areaCode = phoneNumber.slice(2, 5);    
    const firstPart = phoneNumber.slice(5, 8);   
    const secondPart = phoneNumber.slice(8, 10); 
    const thirdPart = phoneNumber.slice(10, 12);

    return `${prefix}(${areaCode})${firstPart}-${secondPart}-${thirdPart}`;
  }

}
