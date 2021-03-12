import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToPreferiti } from 'src/app/redux/redux-preferito/redux-preferito.actions';

@Injectable({
  providedIn: 'root'
})
export class PreferitiService {
  [x: string]: any;

  constructor(private store: Store) { }

  addToPreferiti(idUtente:string,idArticolo:string){
    this.store.dispatch(addToPreferiti({
      idUtente,
      idArticolo
    }))
  }
}
