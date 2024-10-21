import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountPageRoutingModule } from './account-page-routing.module';
import { AccountPageComponent } from './account-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonComponentsModule } from "../../../../core/components/common-components.module";


@NgModule({
  declarations: [AccountPageComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    AccountPageRoutingModule,
    MatIconModule,
    MatButtonModule,
]
})
export class AccountPageModule { }
