import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingComponent } from './components/logging/logging.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from 'src/app/core/services/authorization-service/authorization.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';


@NgModule({
  declarations: [
    LoggingComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    CommonComponentsModule,
  ],
  providers: [AuthorizationService]
})
export class AuthorizationModule { }
