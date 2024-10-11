import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home-page/components/home-page/home-page.component';
import { LoggingComponent } from './modules/authorization/components/logging/logging.component';
import { RegistrationComponent } from './modules/authorization/components/registration/registration.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'logging', component: LoggingComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
