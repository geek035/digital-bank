import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountPageRoutingModule } from './account-page-routing.module';
import { AccountPageComponent } from './account-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonComponentsModule } from '../../../../core/components/common-components.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { TransactionsOperationsModule } from '../transactions-operations/transactions-operations.module';

@NgModule({
  declarations: [AccountPageComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    AccountPageRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    TransactionsOperationsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AccountPageModule {}
