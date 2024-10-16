import { NgModule, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RecoverPasswordComponent } from './recover-password.component';
import { RecoverPasswordService } from 'src/app/core/services/recover-password/recover-password.service';
import { RecoverPasswordRoutingModule } from './recover-password-routing.module';

@NgModule({
  declarations: [RecoverPasswordComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
    RecoverPasswordRoutingModule,
  ],
})
export class RecoverPasswordModule {}
