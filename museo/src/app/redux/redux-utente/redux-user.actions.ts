import { createAction, props } from "@ngrx/store";
import { Response } from 'src/app/core/model/response.interface';

export const retreiveAllUtenti = createAction('[Utente] retrieve');

export const createUtente = createAction('[Utente] create', props<{
    username: string, 
    password: string, 
    dataNascitata:string
    sesso:string
    nome: string,
    cognome: string,
    email: string
}>());

export const updateUtente = createAction('[Utente] update', props<{
    id:string, 
    username: string, 
    password: string, 
    nome: string,
    cognome: string,
    dataNascitata:string
    sesso:string
    email: string
}>());

export const deleteUtente = createAction('[Utente] delete', props<{id:string}>());
export const loginUtente = createAction('[Utente] login', props<{
    username: string, 
    password: string
}>());

export const initUtenti = createAction('[UtenteInit] init', props<{response: Response}>());
