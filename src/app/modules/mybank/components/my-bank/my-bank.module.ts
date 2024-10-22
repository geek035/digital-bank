import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBankRoutingModule } from './my-bank-routing.module';
import { MyBankComponent } from './my-bank.component';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductsModule } from '../products/products.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MyBankComponent],
  imports: [
    CommonModule,
    MyBankRoutingModule,
    CommonComponentsModule,
    MatButtonModule,
    MatIconModule,
    ProductsModule,
    MatDialogModule,
  ],
})
export class MyBankModule {}
