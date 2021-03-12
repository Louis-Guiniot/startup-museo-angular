import { Action } from "@ngrx/store";
import { Response } from 'src/app/core/model/response.interface';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { HttpCommunicationsService } from "src/app/core/http/http-communications.service";
import { updateAdmin, initAdmin, deleteAdmin, retreiveAllAdmins, createAdmin, loginAdmin,  initUserAdmin, loginAdminUserFailure, loginAdminUserSuccess } from "./redux-admin.actions";



@Injectable()
export class AdminEffects {

    constructor(private actions$: Actions, private http: HttpCommunicationsService, private router: Router) { }

    retreiveAllAdmins(): Observable<Response> {
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

    findUpdateAdmin(
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

    deleteAdmin(id: string): Observable<Response>{
        console.log(this.http.retrievePostCall<Response>('admin/delete',{id}));
        return this.http.retrievePostCall<Response>('admin/delete',{id});
    }

    loginAdmin(username:string,password:string){
        return this.http.retrievePostCall<Response>('admin/signIn', {
            username,
            password,
        });
    }

    findUpdateAdmin$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(updateAdmin),
        switchMap((action) => this.findUpdateAdmin(
            action.id,
            action.username,
            action.password,
            action.roles
            ).pipe(
            map((response) => initAdmin({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectAdmin'))
        ))
    ));

    deleteAdmin$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(deleteAdmin),
        switchMap((action) => this.deleteAdmin(
            action.id).pipe(
            map((response) => initAdmin({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectAdmin'))
        ))
    ));

    getAllAdmins$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(retreiveAllAdmins),
        switchMap(() => this.retreiveAllAdmins().pipe(
            map((response) => initAdmin({ response }))
        ))
    ));

    createAdmin$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(createAdmin),
        switchMap((action) => this.createAdmin(
            action.username,
            action.password,
            action.roles
            ).pipe(
            map((response) => initAdmin({ response }))
            ,tap(()=>this.router.navigateByUrl('/redirectAdmin'))
        ))
    ));

    loginAdmin$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(loginAdmin),
        switchMap((action) => this.loginAdmin(
            action.username,
            action.password
        ).pipe(
            map((response) => {
                if(response.result === null){
                  return loginAdminUserFailure({error:'Username e/o Password non corretta'})
                }else{
                  return loginAdminUserSuccess({admin: response.result})
                }
              })
        ))
    ));
  

//******************************/
loginUserSuccess$=createEffect(()=>this.actions$.pipe(
    ofType(loginAdminUserSuccess),
    map( (action) => initUserAdmin( {admin: action.admin} )),
    tap(()=>this.router.navigateByUrl('/admin/panel'))
  ));


}


