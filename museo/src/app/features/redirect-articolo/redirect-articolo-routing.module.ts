import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectArticoloComponent } from './redirect-articolo.component';

const routes: Routes = [{ path: '', component: RedirectArticoloComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectArticoloRoutingModule { }
