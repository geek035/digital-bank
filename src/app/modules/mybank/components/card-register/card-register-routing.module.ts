import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardRegisterComponent } from './card-register.component';

const routes: Routes = [{ path: '', component: CardRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardRegisterRoutingModule {}
