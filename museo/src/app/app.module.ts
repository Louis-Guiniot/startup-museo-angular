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
import { PreferitoEffects } from './redux/redux-preferito/redux-preferito.effects';
import { PreferitiComponent } from './features/preferiti/main/preferiti.component';
import { CommonModule } from '@angular/common';
import { CreaArticoloComponent } from './features/crea-articolo/main/crea-articolo.component';
import { DettaglioArticoloComponent } from './features/dettaglio-articolo/main/dettaglio-articolo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticoliComponent,
    PageNotFoundComponent,
    LoginAdminComponent,
    PreferitiComponent,
    CreaArticoloComponent,
    DettaglioArticoloComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(reducers),
     EffectsModule.forRoot([
      ArticoloEffects,
      UtenteEffects,
      AdminEffects,
      PreferitoEffects
     ]),
     NgbModule,
     BrowserAnimationsModule
  ],
  providers: [HttpCommunicationsService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
})
export class AppModule { }
