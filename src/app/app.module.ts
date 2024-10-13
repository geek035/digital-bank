import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './modules/home-page/home-page.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AutherizationInterceptor } from './core/interceptors/autherization/autherization.interceptor';
import { MyBankModule } from './modules/mybank/mybank.module';


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
    AuthorizationModule,
    MyBankModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutherizationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
