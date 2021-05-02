import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    PageNotFoundRoutingModule
  ]
})
export class PageNotFoundModule { }
