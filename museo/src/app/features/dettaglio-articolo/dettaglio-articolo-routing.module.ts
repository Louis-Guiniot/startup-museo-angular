import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DettaglioArticoloComponent } from './main/dettaglio-articolo.component';

const routes: Routes = [{path:'', component:DettaglioArticoloComponent}]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DettaglioArticoloRoutingModule { }
