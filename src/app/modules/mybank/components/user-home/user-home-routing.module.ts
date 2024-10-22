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
        pathMatch: 'full',
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
      {
        path: 'card-register-operation',
        loadChildren: () =>
          import(
            `../card-register-operation/card-register-operation.module`
          ).then((m) => m.CardRegisterOperationModule),
      },
      {
        path: 'account-register',
        loadChildren: () =>
          import(`../account-register/account-register.module`).then(
            (m) => m.AccountRegisterModule,
          ),
      },
      {
        path: 'account-register-operation',
        loadChildren: () =>
          import(
            `../account-register-operation/account-register-operation.module`
          ).then((m) => m.AccountRegisterOperationModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import(`../account-page/account-page.module`).then(
            (m) => m.AccountPageModule,
          ),
      },
      {
        path: 'personal-account',
        loadChildren: () =>
          import(`../personal-account/personal-account.module`).then(
            (m) => m.PersonalAccountModule,
          ),
      },
      {
        path: 'update-user',
        loadChildren: () =>
          import(`../update-user-data/update-user-data.module`).then(
            (m) => m.UpdateUserDataModule,
          ),
      },
      {
        path: 'operations-list',
        loadChildren: () =>
          import(`../operations-list/operations-list.module`).then(
            (m) => m.OperationsListModule,
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
