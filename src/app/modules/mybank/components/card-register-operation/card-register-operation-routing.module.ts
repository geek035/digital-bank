import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardRegisterOperationComponent } from './card-register-operation.component';

const routes: Routes = [
  { path: '', component: CardRegisterOperationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardRegisterOperationRoutingModule {}
