import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRegisterOperationRoutingModule } from './account-register-operation-routing.module';
import { AccountRegisterOperationComponent } from './account-register-operation.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AccountRegisterOperationComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    AccountRegisterOperationRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountRegisterOperationModule {}
