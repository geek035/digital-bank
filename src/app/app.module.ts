import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AutherizationInterceptor } from './core/interceptors/autherization/autherization.interceptor';
import { AuthorizationService } from './core/services/authorization-service/authorization.service';
import { RecoverPasswordService } from './core/services/recover-password/recover-password.service';
import { HomePageModule } from './modules/home-page/components/home-page/home-page.module';
import { UserDataService } from './core/services/user-data-service/user-data.service';
import { UserHomeModule } from './modules/mybank/components/user-home/user-home.module';
import { OperationsListComponent } from './modules/mybank/components/operations-list/operations-list.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomePageModule,
    UserHomeModule,
  ],
  providers: [
    { provide: AuthorizationService },
    { provide: RecoverPasswordService },
    { provide: UserDataService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutherizationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
