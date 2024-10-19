import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRegisterOperationRoutingModule } from './card-register-operation-routing.module';
import { CardRegisterOperationComponent } from './card-register-operation.component';


@NgModule({
  declarations: [
    CardRegisterOperationComponent
  ],
  imports: [
    CommonModule,
    CardRegisterOperationRoutingModule
  ]
})
export class CardRegisterOperationModule { }
