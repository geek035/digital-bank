import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBankRoutingModule } from './my-bank-routing.module';
import { MyBankComponent } from './my-bank.component';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [MyBankComponent],
  imports: [
    CommonModule,
    MyBankRoutingModule,
    CommonComponentsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
  ],
})
export class MyBankModule {}
