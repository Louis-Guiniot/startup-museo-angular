import { Action, createReducer, on } from "@ngrx/store";
import { Preferito } from "src/app/core/model/model-data/preferiti.interface";
import { initPreferiti } from "./redux-preferito.actions";

export interface PreferitoState{
    preferiti: Preferito[]
}

export const initialState: PreferitoState = {
    preferiti:[]
};

export const preferitoReducer = createReducer(
    initialState,
    on(initPreferiti, (state, { response }) => {
        return ({... state, preferiti: response.result})
    })
);

export function reducer(state: PreferitoState, action: Action){
    return preferitoReducer(state, action)
}