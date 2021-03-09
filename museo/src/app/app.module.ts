import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticoliComponent } from './features/articoli/main/articoli.component';
import { HomeComponent } from './features/home/main/home.component';
import { LoginComponent } from './features/login/main/login.component';
import { PageNotFoundComponent } from './features/page-not-found/main/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticoliComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
