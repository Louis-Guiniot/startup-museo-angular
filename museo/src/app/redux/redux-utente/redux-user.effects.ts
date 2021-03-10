import { Action } from "@ngrx/store";
import { Response } from 'src/core/model/response.interface';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/core/http/http-communications.service";
import { createUtente, deleteUtente, initUtenti, loginUtente, retreiveAllUtenti, updateUtente } from "./redux-user.actions";


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
        roles: string
    ): Observable<Response>{
        return this.http.retrievePostCall<Response>('user/create',{
            username,
            password,
            roles
        });
    }

    findUpdateUtente(
        id:string,
        username: string,
        password: string,
        roles: string
    ){
        return this.http.retrievePostCall<Response>('user/update',{
            id,
            username,
            password,
            roles
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
            action.roles
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
            action.roles
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
