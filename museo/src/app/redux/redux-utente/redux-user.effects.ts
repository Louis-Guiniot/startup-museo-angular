import { Action } from "@ngrx/store";
import { Response } from 'src/app/core/model/response.interface';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { createUtente,  deleteUtente, initUser, initUtenti,  loginUserFailure,  loginUtente,  loginUtenteSuccess,  retreiveAllUtenti, updateUtente } from "./redux-user.actions";
import { HttpCommunicationsService } from "src/app/core/http/http-communications.service";


@Injectable()
export class UtenteEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllUtenti(): Observable<Response> {
        return this.http.retrieveGetCall<Response>("utente/findAll");
    }

    
    createUtente(
        username: string,
        password: string,
        nome: string,
        cognome: string,
        dataNascita:string,
        sesso:string,
        email: string
    ): Observable<Response>{
        return this.http.retrievePostCall<Response>('utente/create',{
            username,
            password,
            nome,
            cognome,
            dataNascita,
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
        dataNascita:string,
        sesso:string,
        email: string
    ){
        return this.http.retrievePostCall<Response>('utente/update',{
            id,
            username,
            password,
            nome,
            cognome,
            dataNascita,
            sesso,
            email
        });
    }

    deleteUtente(id: string): Observable<Response>{
        console.log(this.http.retrievePostCall<Response>('utente/delete',{id}));
        return this.http.retrievePostCall<Response>('utente/delete',{id});
    }

    loginUtente(username:string,password:string){
        return this.http.retrievePostCall<Response>('utente/signIn', {
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
            action.dataNascita,
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
            action.dataNascita,
            action.sesso,
            action.email
            ).pipe(
            map((response) => 
            initUtenti({ response }))
            ,tap(()=>this.router.navigateByUrl('/cards'))
        ))
    ));


    

    loginUtente$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(loginUtente),
        switchMap((action) => this.loginUtente(
            action.username,
            action.password
        ).pipe(
            map((response) => {
                if(response.result === null){
                  return loginUserFailure({error:'Username e/o Password non corretta'})
                }else{   
                    sessionStorage.setItem('user',action.username)
                    return loginUtenteSuccess({user: response.result})
                }
              })
        ))
    ));

    //******************************/
loginUtenteSuccess$=createEffect(()=>this.actions$.pipe(
    ofType(loginUtenteSuccess),
    map( (action) => initUser( {user: action.user} )),
    tap(()=>this.router.navigateByUrl('/cards'))
  ));
  
}
