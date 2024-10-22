import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferOperationComponent } from './transfer-operation/transfer-operation.component';
import { RefillOperationComponent } from './refill-operation/refill-operation.component';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';



@NgModule({
  declarations: [
    TransferOperationComponent,
    RefillOperationComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    CustomPipesModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    
  ],
  exports: [
    TransferOperationComponent,
    RefillOperationComponent,
  ]
})
export class TransactionsOperationsModule { }
