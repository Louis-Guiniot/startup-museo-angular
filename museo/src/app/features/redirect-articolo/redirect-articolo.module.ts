import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedirectArticoloRoutingModule } from './redirect-articolo-routing.module';
import { RedirectArticoloComponent } from './redirect-articolo.component';


@NgModule({
  declarations: [RedirectArticoloComponent],
  imports: [
    CommonModule,
    RedirectArticoloRoutingModule
  ]
})
export class RedirectArticoloModule { }
