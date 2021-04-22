import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreaArticoloComponent } from './main/crea-articolo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreaArticoloRoutingModule } from './crea-articolo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CreaArticoloRoutingModule
  ],
  declarations: []
})
export class CreaArticoloModule { }
