import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';
import { CardComponent } from './card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [CardComponent, AccountComponent],
  imports: [
    CommonModule,
    CustomPipesModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatInputModule,
    MatButtonModule,
  ],
  exports: [CardComponent, AccountComponent],
})
export class ProductsModule { }
