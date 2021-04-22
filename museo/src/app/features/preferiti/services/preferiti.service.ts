import { deletePreferito, retreiveAllPreferitiOfUtente } from './../../../redux/redux-preferito/redux-preferito.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToPreferiti } from 'src/app/redux/redux-preferito/redux-preferito.actions';

@Injectable({
  providedIn: 'root'
})
export class PreferitiService {
  [x: string]: any;

  constructor(private store: Store) { }

  addToPreferiti(idUtente:number,idArticolo:number){
    this.store.dispatch(addToPreferiti({
      idUtente,
      idArticolo
    }))
  }

  deletePreferito(id:number){
    this.store.dispatch(deletePreferito({id}))
  }

  getAllPreferiti(){
    this.store.dispatch(retreiveAllPreferitiOfUtente())
  }
}
