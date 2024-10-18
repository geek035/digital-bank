import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRegisterRoutingModule } from './card-register-routing.module';
import { CardRegisterComponent } from './card-register.component';


@NgModule({
  declarations: [
    CardRegisterComponent
  ],
  imports: [
    CommonModule,
    CardRegisterRoutingModule
  ]
})
export class CardRegisterModule { }
