import { NgModule } from '@angular/core';
import { CardNumberPipe } from './card-number/card-number.pipe';
import { CodeCVCPipe } from './code-cvc/code-cvc.pipe';
import { TelephoneNumberPipe } from './telephone-number/telephone-number.pipe';
import { CurrencyIconPipe } from './currency-icon/currency-icon.pipe';
import { AccountClassPipe } from './account-class/account-class.pipe';
import { CardClassPipe } from './card-class/card-class.pipe';
import { CardTermClassPipe } from './card-term-class/card-term-class.pipe';
import { CardNumberClassPipe } from './card-number-class/card-number-class.pipe';
import { ProgramTypeLogoPipe } from './program-type-logo/program-type-logo.pipe';
import { CardStatePipe } from './card-state/card-state.pipe';
import { AccountStatePipe } from './account-state/account-state.pipe';
import { CardOperationTipePipe } from './card-operation-type/card-operation-tipe.pipe';
import { AccountOperationTypePipe } from './account-operation-type/account-operation-type.pipe';

@NgModule({
  declarations: [
    CardNumberPipe,
    CodeCVCPipe,
    TelephoneNumberPipe,
    CurrencyIconPipe,
    AccountClassPipe,
    CardClassPipe,
    CardTermClassPipe,
    CardNumberClassPipe,
    ProgramTypeLogoPipe,
    CardStatePipe,
    AccountStatePipe,
    CardOperationTipePipe,
    AccountOperationTypePipe,
  ],
  exports: [
    CardNumberPipe,
    CodeCVCPipe,
    TelephoneNumberPipe,
    CurrencyIconPipe,
    AccountClassPipe,
    CardClassPipe,
    CardTermClassPipe,
    CardNumberClassPipe,
    ProgramTypeLogoPipe,
    CardStatePipe,
    AccountStatePipe,
    AccountOperationTypePipe,
    CardOperationTipePipe,
  ],
})
export class CustomPipesModule {}
