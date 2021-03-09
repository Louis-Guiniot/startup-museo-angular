import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    this.articoliService.retreiveAllArticoli()
  }

  ngOnInit(): void {
  }

  get lista_articoli(): Observable<Articolo[]> {
    return this.store.pipe(select(selectArticolis))
  }
  
}
