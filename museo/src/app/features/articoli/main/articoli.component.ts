import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectArticolis } from 'src/app/redux/redux-articolo';
import { Articolo } from 'src/core/model/model-data/articolo.interface';
import { ArticoliService } from '../services/articoli.service';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.scss']
})
export class ArticoliComponent implements OnInit {

  constructor(private router: Router, private articoliService: ArticoliService, private store: Store, private fb: FormBuilder) {
    //tramite service carico già la lista di articoli. da Undefined però
    this.articoliService.retreiveAllArticoli()
  }

  formCreazioneArticolo:FormGroup

  ngOnInit(): void {
    this.formCreazioneArticolo = this.fb.group({
      modello: ['', Validators.required],
      marca: ['', Validators.required],
      descrizione: ['', Validators.required],
      nazionalita: ['', Validators.required],
      ram: ['', Validators.required],
      processore: ['', Validators.required],
      schedaVideo: ['', Validators.required],
      schedaMadre: ['', Validators.required],
      annoProduzioneInizio: ['', Validators.required],
      annoProduzioneFine: ['', Validators.required],
      foto: ['', Validators.required],
    })
  }

  //tramite redux prendo lista articoli presenti su db. su html accedo tramite for di lista_articoli
  get lista_articoli(): Observable<Articolo[]> {
    return this.store.pipe(select(selectArticolis))
  }
  
}
