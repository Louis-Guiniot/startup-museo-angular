import { Action } from "@ngrx/store";
import { Response } from 'src/app/core/model/response.interface';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { createUtente,  deleteUtente, initUtenti,  loginUtente,  retreiveAllUtenti, updateUtente } from "./redux-user.actions";
import { HttpCommunicationsService } from "src/app/core/http/http-communications.service";


@Injectable()
export class UtenteEffects {
    retreiveAllUsers() {
        throw new Error("Method not implemented.");
    }

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllUtenti(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("user/findAll");
    }

    
    createUtente(
        username: string,
        password: string,
        nome: string,
        cognome: string,
        dataNascitata:string,
        sesso:string,
        email: string
    ): Observable<Response>{
        return this.http.retrievePostCall<Response>('user/create',{
            username,
            password,
            nome,
            cognome,
            dataNascitata,
            sesso,
            email
        });
    }

    findUpdateUtente(
        id:string,
        username: string,
        password: string,
        nome: string,
        cognome: string,
        dataNascitata:string,
        sesso:string,
        email: string
    ){
        return this.http.retrievePostCall<Response>('user/update',{
            id,
            username,
            password,
            nome,
            cognome,
            dataNascitata,
            sesso,
            email
        });
    }

    deleteUtente(id: string): Observable<Response>{
        console.log(this.http.retrievePostCall<Response>('user/delete',{id}));
        return this.http.retrievePostCall<Response>('user/delete',{id});
    }

    loginUtente(username:string,password:string){
        return this.http.retrievePostCall<Response>('user/signIn', {
            username,
            password,
        });
    }

    findUpdateUtente$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updateUtente),
        switchMap((action) => this.findUpdateUtente(
            action.id,
            action.username,
            action.password,
            action.nome,
            action.cognome,
            action.dataNascitata,
            action.sesso,
            action.email
            ).pipe(
            map((response) => initUtenti({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectUtente'))
        ))
    ));

    deleteUtente$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteUtente),
        switchMap((action) => this.deleteUtente(
            action.id).pipe(
            map((response) => initUtenti({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectUtente'))
        ))
    ));

    getAllUtenti$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllUtenti),
        switchMap(() => this.retreiveAllUtenti().pipe(
            map((response) => initUtenti({ response }))
        ))
    ));

    createUtente$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createUtente),
        switchMap((action) => this.createUtente(
            action.username,
            action.password,
            action.nome,
            action.cognome,
            action.dataNascitata,
            action.sesso,
            action.email
            ).pipe(
            map((response) => initUtenti({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectUtente'))
        ))
    ));

    loginUtente$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(loginUtente),
        switchMap((action) => this.loginUtente(
            action.username,
            action.password
        ).pipe(
            map((response) => initUtenti({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectUtente'))
        ))
    ));
  
}
