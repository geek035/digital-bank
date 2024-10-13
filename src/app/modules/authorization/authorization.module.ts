import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { LoggingModule } from './components/logging/logging.module';
import { RegistrationModule } from './components/registration/registration.module';
import { RecoverPasswordModule } from './components/recover-password/recover-password.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggingModule,
    RegistrationModule,
    RecoverPasswordModule,
    CommonComponentsModule,
  ],
})
export class AuthorizationModule {}
