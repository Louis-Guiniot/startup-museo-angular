import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { UtenteState } from "./redux-user.reducers";

export const selectUtenteState = (state: AppState) => state.utenteState;

export const selectUtenti = createSelector(
    selectUtenteState,
    (state: UtenteState) => state.utenti
);

export const getCurrentUtente = createSelector(
    selectUtenteState,
    (state: UtenteState, params: Params) => state.utenti.find(item => item.id === Number(params['id']))
);