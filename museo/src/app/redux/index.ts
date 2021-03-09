import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { ArticoloState, articoloReducer } from "./redux-articolo/redux-articolo.reducers";

export interface AppState{
    router: RouterReducerState<any>;
    articoloState: ArticoloState

}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    articoloState: articoloReducer
}