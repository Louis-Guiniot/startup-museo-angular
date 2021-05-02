import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Utente } from 'src/app/core/model/model-data/utente.interface';
import { selectArticoli } from 'src/app/redux/redux-articolo';
import { getCurrentUtente, selectUtenti } from 'src/app/redux/redux-utente';
import { PreferitiService } from '../../preferiti/services/preferiti.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  idUtente:any;
  constructor(private router: Router, 
    private store: Store, private fb: FormBuilder, private modalService: NgbModal,
    private preferitiService: PreferitiService ) { }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentUtente)).subscribe((utente)=>{return this.idUtente=utente.id});
    }

  
  selectCurrentUser(){
   
  
  }
  
}
