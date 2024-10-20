import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codeCVC'
})
export class CodeCVCPipe implements PipeTransform {

  transform(cvc: number, isHidden: boolean): string {    
    if (isHidden) {
      return cvc.toString().replace(/\d/g, '*');
    }

    return cvc.toString();
  }

}
