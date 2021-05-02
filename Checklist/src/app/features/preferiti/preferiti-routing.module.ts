import { NgModule } from '@angular/core';
import { PreferitiComponent } from './main/preferiti.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path:'', component:PreferitiComponent}]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PreferitiRoutingModule { }
