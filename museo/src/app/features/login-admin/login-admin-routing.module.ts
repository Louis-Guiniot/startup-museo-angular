import { NgModule } from '@angular/core';
import { LoginAdminComponent } from './main/login-admin.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path:'', component:LoginAdminComponent}]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoginAdminRoutingModule { }
