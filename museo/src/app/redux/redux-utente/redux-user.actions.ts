import { createAction, props } from "@ngrx/store";
import { Utente } from "src/app/core/model/model-data/utente.interface";
import { Response } from 'src/app/core/model/response.interface';

export const retreiveAllUtenti = createAction('[Utente] retrieve');

export const createUtente = createAction('[Utente] create', props<{
    username: string, 
    password: string, 
    dataNascita:string,
    sesso:string,
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
    dataNascita:string,
    sesso:string,
    email: string
}>());

export const deleteUtente = createAction('[Utente] delete', props<{id:string}>());
export const loginUtente = createAction('[Utente] login', props<{
    username: string, 
    password: string
}>());

export const initUtenti = createAction('[UtenteInit] init', props<{response: Response}>());
export const initUser = createAction('[UserInit]' , props<{user: Utente}>());

export const loginUserSuccess = createAction('[User] Login Success', props<{user: Utente}>());
export const loginUserFailure = createAction('[User] Login Failure', props<{error: string}>());
