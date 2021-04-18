import { createAction, props } from "@ngrx/store";
import { Response } from 'src/app/core/model/response.interface';

export const initArticoli = createAction('[Articolo] init Articoli', props<{response: Response}>());
export const retreiveAllArticoli = createAction('[Articolo] Articolo');
export const deleteArticolo = createAction('[Articolo] delete Articolo',props<{id: string}>());
export const updateArticolo = createAction('[Articolo] find-update', props<{
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
    foto:string|ArrayBuffer,
    stato:string
}>())
export const createArticolo = createAction('[Articolo] creazione Articolo', props<{
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
    foto: string|ArrayBuffer,
    stato:string
}>());
