import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { ArticoloState } from "./redux-articolo.reducers";

export const selectArticoloState = (state: AppState) => state.articoloState;

export const selectArticolis = createSelector(
    selectArticoloState,
    (state: ArticoloState) => state.articoli
);

export const getCurrentArticolo = createSelector(
    selectArticoloState,
    (state: ArticoloState, params: Params) => state.articoli.find(item => item.id === Number(params['id']))
);