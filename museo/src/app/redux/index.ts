import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { ArticoloState, articoloReducer } from "./redux-articolo/redux-articolo.reducers";
import { utenteReducer, UtenteState } from "./redux-utente/redux-user.reducers";

export interface AppState{
    router: RouterReducerState<any>;
    articoloState: ArticoloState
    utenteState: UtenteState
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    articoloState: articoloReducer,
    utenteState: utenteReducer
}