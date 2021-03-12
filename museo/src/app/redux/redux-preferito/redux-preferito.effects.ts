import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { Response } from 'src/app/core/model/response.interface';

import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/http/http-communications.service";
import { addToPreferiti, deletePreferito, initPreferiti, retreiveAllPreferitiOfUtente } from "./redux-preferito.actions";

@Injectable()
export class PreferitoEffects {
    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllPreferitiOfUtente(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("preferiti/findPreferitiUtente")
    }

    addToPreferiti(idUtente:string,idArticolo: string): Observable<Response> {
        return this.http.retrievePostCall<Response>("preferiti/create", {
            idUtente,
            idArticolo
        })
    }

    deletePreferito(idPreferito: string, idUtente:string,idArticolo: string): Observable<Response> {
        return this.http.retrievePostCall<Response>("preferiti/delete", {
            idPreferito,
            idUtente,
            idArticolo
        })
    }

    addToPreferiti$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(addToPreferiti),
        switchMap((action) => this.addToPreferiti(
            action.idUtente,
            action.idArticolo
            ).pipe(
            map((response) => initPreferiti({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectArticolo'))
        ))
    ));

    deletePreferito$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deletePreferito),
        switchMap((action) => this.deletePreferito(
            action.idPreferito,
            action.idUtente,
            action.idArticolo
            ).pipe(
            map((response) => initPreferiti({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectArticolo'))
        ))
    ));

    getPreferiti$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllPreferitiOfUtente),
        switchMap(() => this.retreiveAllPreferitiOfUtente().pipe(
            map((response) => initPreferiti({ response }))
        ))
    ));
    
}
