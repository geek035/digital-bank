import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBankComponent } from './my-bank.component';

const routes: Routes = [
  { path: '', component: MyBankComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBankRoutingModule { }
