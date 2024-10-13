import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home-page/components/home-page/home-page.component';
import { LoggingComponent } from './modules/authorization/components/logging/logging.component';
import { RegistrationComponent } from './modules/authorization/components/registration/registration.component';
import { MyBankGuard } from './core/guards/my-bank/my-bank.guard';
import { MyBankComponent } from './modules/mybank/components/my-bank/my-bank.component';
import { RecoverPasswordComponent } from './modules/authorization/components/recover-password/recover-password.component';

const routes: Routes = [
  { 
    path: 'mybank',
    component: MyBankComponent,
    canActivate: [MyBankGuard]
  },
  { path: 'home', component: HomePageComponent },
  { path: 'logging', component: LoggingComponent },
  { path: 'recover-password', component: RecoverPasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
