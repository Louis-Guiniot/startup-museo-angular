import { createReducer, Action, on } from "@ngrx/store";
import { Articolo } from "src/app/core/model/model-data/articolo.interface";
import { initArticoli } from "./redux-articolo.actions";

export interface ArticoloState {
    articoli: Articolo[];
}

export const initialState: ArticoloState = {
    articoli: [],
    
};

export const articoloReducer = createReducer(
    initialState,
    on(initArticoli, (state, { response }) => {
        return ({ ...state, articoli: response.result });
    }),  
);

export function reducer(state: ArticoloState, action: Action) {
    return articoloReducer(state, action);
}