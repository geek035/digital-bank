import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserDataComponent } from './update-user-data.component';

const routes: Routes = [{ path: '', component: UpdateUserDataComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUserDataRoutingModule {}
