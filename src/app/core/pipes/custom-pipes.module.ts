import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardNumberPipe } from './card-number/card-number.pipe';
import { CodeCVCPipe } from './code-cvc/code-cvc.pipe';

@NgModule({
  declarations: [CardNumberPipe, CodeCVCPipe],
  imports: [CommonModule],
  exports: [CardNumberPipe, CodeCVCPipe],
})
export class CustomPipesModule {}
