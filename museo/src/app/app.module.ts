import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticoliComponent } from './features/articoli/main/articoli.component';
import { HomeComponent } from './features/home/main/home.component';
import { LoginComponent } from './features/login/main/login.component';
import { PageNotFoundComponent } from './features/page-not-found/main/page-not-found.component';
import { reducers } from './redux';
import { ArticoloEffects } from './redux/redux-articolo/redux-articolo.effects';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { HttpCommunicationsService } from 'src/app/core/http/http-communications.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminEffects } from './redux/redux-admin/redux-admin.effects';
import { UtenteEffects } from './redux/redux-utente/redux-user.effects';
import { LoginAdminComponent } from './features/login-admin/main/login-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticoliComponent,
    PageNotFoundComponent,
    LoginAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(reducers),
     EffectsModule.forRoot([
      ArticoloEffects,
      UtenteEffects,
      AdminEffects
     ]),
     NgbModule
  ],
  providers: [HttpCommunicationsService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class AppModule { }
