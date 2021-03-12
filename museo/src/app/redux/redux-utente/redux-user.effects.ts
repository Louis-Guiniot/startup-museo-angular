import { Action } from "@ngrx/store";
import { Response } from 'src/app/core/model/response.interface';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { createAdmin,  deleteUtente, initUtenti, loginAdmin,  retreiveAllUtenti, updateUtente } from "./redux-user.actions";
import { HttpCommunicationsService } from "src/app/core/http/http-communications.service";


@Injectable()
export class UtenteEffects {
    retreiveAllUsers() {
        throw new Error("Method not implemented.");
    }

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllUtenti(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("admin/findAll");
    }

    
    createAdmin(
        username: string,
        password: string,
        roles: string
    ): Observable<Response>{
        return this.http.retrievePostCall<Response>('admin/create',{
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
        return this.http.retrievePostCall<Response>('admin/update',{
            id,
            username,
            password,
            roles
        });
    }

    deleteUtente(id: string): Observable<Response>{
        console.log(this.http.retrievePostCall<Response>('admin/delete',{id}));
        return this.http.retrievePostCall<Response>('admin/delete',{id});
    }

    loginAdmin(username:string,password:string){
        return this.http.retrievePostCall<Response>('admin/signIn', {
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
        ofType(createAdmin),
        switchMap((action) => this.createAdmin(
            action.username,
            action.password,
            action.roles
            ).pipe(
            map((response) => initUtenti({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectUtente'))
        ))
    ));

    loginUtente$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(loginAdmin),
        switchMap((action) => this.loginAdmin(
            action.username,
            action.password
        ).pipe(
            map((response) => initUtenti({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectUtente'))
        ))
    ));
  
}
