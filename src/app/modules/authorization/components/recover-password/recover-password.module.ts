import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RecoverPasswordComponent } from './recover-password.component';
import { RecoverPasswordRoutingModule } from './recover-password-routing.module';

@NgModule({
  declarations: [RecoverPasswordComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    RecoverPasswordRoutingModule,
  ],
})
export class RecoverPasswordModule {}
