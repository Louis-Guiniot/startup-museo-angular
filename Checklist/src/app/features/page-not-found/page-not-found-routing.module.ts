import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './main/page-not-found.component';

const routes: Routes = [{path:'', component:PageNotFoundComponent}]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PageNotFoundRoutingModule { }
