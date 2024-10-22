import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRegisterOperationComponent } from './account-register-operation.component';

const routes: Routes = [
  { path: '', component: AccountRegisterOperationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRegisterOperationRoutingModule {}
