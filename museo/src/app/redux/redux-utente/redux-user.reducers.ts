import { createReducer, Action, on } from "@ngrx/store";
import { Utente } from "src/core/model/model-data/Utente.interface";
import { initUtenti } from "./redux-user.actions";

export interface UtenteState {
    utenti: Utente[];
}

export const initialState: UtenteState = {
    utenti: [],
    
};

export const utenteReducer = createReducer(
    initialState,
    on(initUtenti, (state, { response }) => ({ ...state, utenti: response.result })),  
);

export function reducer(state: UtenteState, action: Action) {
    return utenteReducer(state, action);
}