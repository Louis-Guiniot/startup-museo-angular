import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createAdmin, deleteAdmin, updateAdmin, retreiveAllAdmins, loginAdmin } from 'src/app/redux/redux-admin/redux-admin.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

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

deleteAdmin(id:string){
this.store.dispatch(deleteAdmin({id}))
}

updateAdmin(
    id:string,
    username:string,
    password:string,
    roles:string
){
this.store.dispatch(updateAdmin({
  id, 
  username,
  password,
  roles
}))
}

retreiveAllAdmins(){
this.store.dispatch(retreiveAllAdmins())
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
