import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsListComponent } from './operations-list.component';

const routes: Routes = [
  {path: '', component: OperationsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsListRoutingModule { }
