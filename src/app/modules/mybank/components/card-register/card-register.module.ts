import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRegisterRoutingModule } from './card-register-routing.module';
import { CardRegisterComponent } from './card-register.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonComponentsModule } from "../../../../core/components/common-components.module";
import { CardRegisterOperationService } from '../../services/card-register-operation/card-register-operation.service';


@NgModule({
  declarations: [
    CardRegisterComponent
  ],
  imports: [
    CommonModule,
    CardRegisterRoutingModule,
    MatIconModule,
    CommonComponentsModule
  ],
  providers: [
    {provide: CardRegisterOperationService}
  ]
})
export class CardRegisterModule { }
