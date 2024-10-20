import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRegisterOperationRoutingModule } from './card-register-operation-routing.module';
import { CardRegisterOperationComponent } from './card-register-operation.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonComponentsModule } from '../../../../core/components/common-components.module';

@NgModule({
  declarations: [CardRegisterOperationComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    CardRegisterOperationRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatListModule,
    MatIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardRegisterOperationModule {}
