import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardNumberPipe } from './card-number/card-number.pipe';
import { CodeCVCPipe } from './code-cvc/code-cvc.pipe';
import { TelephoneNumberPipe } from './telephone-number/telephone-number.pipe';

@NgModule({
  declarations: [CardNumberPipe, CodeCVCPipe, TelephoneNumberPipe],
  imports: [CommonModule],
  exports: [CardNumberPipe, CodeCVCPipe, TelephoneNumberPipe],
})
export class CustomPipesModule {}
