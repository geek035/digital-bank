import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRegisterRoutingModule } from './card-register-routing.module';
import { CardRegisterComponent } from './card-register.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CardRegisterComponent
  ],
  imports: [
    CommonModule,
    CardRegisterRoutingModule,
    MatIconModule,
  ]
})
export class CardRegisterModule { }
