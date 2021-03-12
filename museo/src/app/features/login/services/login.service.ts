import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createAdmin, deleteUtente, loginAdmin,  retreiveAllUtenti, updateUtente } from 'src/app/redux/redux-utente/redux-user.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  [x: string]: any;

  constructor(private store: Store) { }

  createAdmin(
        username: string, 
        password: string,
        roles: string
  ){
    this.store.dispatch(createAdmin({
      username,
      password,
      roles
    }))
  }
  
  deleteUtente(id:string){
    this.store.dispatch(deleteUtente({id}))
  }

  updateUtente(
        id:string,
        username:string,
        password:string,
        roles:string
  ){
    this.store.dispatch(updateUtente({
      id, 
      username,
      password,
      roles
    }))
  }

  retreiveAllUtenti(){
    this.store.dispatch(retreiveAllUtenti())
  }

  loginAdmin(
    username:string,
    password:string
  ){
    this.store.dispatch(loginAdmin({
      username,
      password
    }))
  }
  
}
