import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home.component';

const routes: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-bank',
        pathMatch: 'full'
      },
      {
        path: 'my-bank',
        loadChildren: () =>
          import(`../my-bank/my-bank.module`).then((m) => m.MyBankModule),
      },
      {
        path: 'card-register',
        loadChildren: () =>
          import(`../card-register/card-register.module`).then(
            (m) => m.CardRegisterModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserHomeRoutingModule {}
