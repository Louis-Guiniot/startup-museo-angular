import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createUtente, deleteUtente, loginUtente, retreiveAllUtenti, updateUtente } from 'src/app/redux/redux-utente/redux-user.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  [x: string]: any;

  constructor(private store: Store) { }

  createUtente(
        username: string, 
        password: string,
        roles: string
  ){
    this.store.dispatch(createUtente({
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

  loginUtente(
    username:string,
    password:string
  ){
    this.store.dispatch(loginUtente({
      username,
      password
    }))
  }
  
}
