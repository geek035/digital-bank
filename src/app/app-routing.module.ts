import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home-page/components/home-page/home-page.component';
import { MyBankGuard } from './core/guards/my-bank/my-bank.guard';
import { MyBankComponent } from './modules/mybank/components/my-bank/my-bank.component';
import { RecoverPasswordGuard } from './core/guards/recover-password/recover-password.guard';

const routes: Routes = [
  {
    path: 'mybank',
    component: MyBankComponent,
    canActivate: [MyBankGuard],
  },
  { path: 'home', component: HomePageComponent },
  {
    path: 'logging',
    loadChildren: () =>
      import('./modules/authorization/components/logging/logging.module').then(
        (m) => m.LoggingModule
      ),
  },
  {
    path: 'recover-password',
    loadChildren: () =>
      import(
        './modules/authorization/components/recover-password/recover-password.module'
      ).then((m) => m.RecoverPasswordModule),
    canDeactivate: [RecoverPasswordGuard],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import(
        './modules/authorization/components/registration/registration.module'
      ).then((m) => m.RegistrationModule),
  },
  { path: '**', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
