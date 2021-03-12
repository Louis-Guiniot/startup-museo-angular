import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createArticolo, deleteArticolo, updateArticolo, retreiveAllArticoli } from 'src/app/redux/redux-articolo/redux-articolo.actions';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {
  [x: string]: any;

  constructor(private store: Store) { }

  createArticolo(
        modello:string,
        marca:string,
        descrizione:string,
        nazionalita:string,
        ram:string,
        processore:string,
        schedaMadre:string,
        schedaVideo:string,
        annoProduzioneInizio:string,
        annoProduzioneFine:string,
        foto:string|ArrayBuffer
  ){
    this.store.dispatch(createArticolo({modello, marca, descrizione, nazionalita, 
                                        ram, processore, schedaMadre, schedaVideo, 
                                        annoProduzioneInizio, annoProduzioneFine,foto}))
  }
  
  deleteArticolo(id:string){
    this.store.dispatch(deleteArticolo({id}))
  }

  updateArticolo(
        id:string,
        modello:string,
        marca:string,
        descrizione:string,
        nazionalita:string,
        ram:string,
        processore:string,
        schedaMadre:string,
        schedaVideo:string,
        annoProduzioneInizio:string,
        annoProduzioneFine:string,
        foto:string|ArrayBuffer
  ){
    this.store.dispatch(updateArticolo({id, modello, marca, descrizione, nazionalita, 
                                        ram, processore, schedaMadre, schedaVideo, 
                                        annoProduzioneInizio, annoProduzioneFine, foto}))
  }

  retreiveAllArticoli(){
    this.store.dispatch(retreiveAllArticoli())
  }
}
