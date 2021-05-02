import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { PreferitoState } from "./redux-preferito.reducers";

export const selectPreferitoState = (state: AppState) => state.preferitoState;

export const selectPreferiti = createSelector(
    selectPreferitoState,
    (state: PreferitoState) => state.preferiti
);

export const getCurrentPreferito = createSelector(
    selectPreferitoState,
    (state: PreferitoState, params: Params) => state.preferiti.find(item => item.id === Number(params['id']))
);