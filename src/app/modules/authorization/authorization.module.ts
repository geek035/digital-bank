import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingComponent } from './components/logging/logging.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization-service/authorization.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationService } from 'src/app/core/services/regtistration-service/registration.service';
import { DialogRegistrationComponent } from './components/dialog-registration/dialog-registration.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [LoggingComponent, RegistrationComponent, DialogRegistrationComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [
    AuthorizationService,
    RegistrationService,
    MatDialog,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
})
export class AuthorizationModule {}
