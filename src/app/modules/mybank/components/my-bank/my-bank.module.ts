import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBankRoutingModule } from './my-bank-routing.module';
import { MyBankComponent } from './my-bank.component';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

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
    MatMenuModule,
    MatDividerModule,
  ],
})
export class MyBankModule {}
