import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArticoliRoutingModule } from './articoli-routing.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ArticoliRoutingModule
  ]
})
export class ArticoliModule { }
