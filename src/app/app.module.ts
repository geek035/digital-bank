import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './modules/home-page/home-page.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AutherizationInterceptor } from './core/interceptors/autherization/autherization.interceptor';
import { AuthorizationService } from './core/services/authorization-service/authorization.service';
import { MyBankModule } from './modules/mybank/components/my-bank/my-bank.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomePageModule,
    MyBankModule
  ],
  providers: [
    { provide: AuthorizationService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutherizationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
