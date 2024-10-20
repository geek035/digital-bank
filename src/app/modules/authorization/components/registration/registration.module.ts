import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationService } from 'src/app/core/services/regtistration-service/registration.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrationComponent } from './registration.component';
import { DialogRegistrationComponent } from '../dialog-registration/dialog-registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  declarations: [RegistrationComponent, DialogRegistrationComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
    RegistrationRoutingModule,
  ],
  providers: [
    RegistrationService,
    MatDialog,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
})
export class RegistrationModule {}
