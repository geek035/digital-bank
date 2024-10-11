import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingComponent } from './components/logging/logging.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    LoggingComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class AuthorizationModule { }
