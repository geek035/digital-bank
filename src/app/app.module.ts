import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './modules/home-page/home-page.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomePageModule,
    AuthorizationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
