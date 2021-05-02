import { CreaArticoloComponent } from './main/crea-articolo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{path:'', component:CreaArticoloComponent}]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CreaArticoloRoutingModule { }
