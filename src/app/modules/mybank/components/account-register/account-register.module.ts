import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRegisterRoutingModule } from './account-register-routing.module';
import { AccountRegisterComponent } from './account-register.component';
import { CommonComponentsModule } from 'src/app/core/components/common-components.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AccountRegisterComponent],
  imports: [
    CommonModule,
    CommonComponentsModule,
    AccountRegisterRoutingModule,
    MatIconModule,
  ],
})
export class AccountRegisterModule {}
