import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
