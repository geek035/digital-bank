import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalAccountRoutingModule } from './personal-account-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { PersonalAccountComponent } from './personal-account.component';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';
import { CommonComponentsModule } from "../../../../core/components/common-components.module";


@NgModule({
  declarations: [
    PersonalAccountComponent,
  ],
  imports: [
    CommonModule,
    PersonalAccountRoutingModule,
    MatIconModule,
    CustomPipesModule,
    CommonComponentsModule
]
})
export class PersonalAccountModule { }
