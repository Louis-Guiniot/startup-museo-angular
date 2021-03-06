import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { ArticoloState, articoloReducer } from "./redux-articolo/redux-articolo.reducers";
import { adminReducer, AdminState} from "./redux-admin/redux-admin.reducers";
import { utenteReducer, UtenteState } from "./redux-utente/redux-user.reducers";
import { preferitoReducer, PreferitoState } from "./redux-preferito/redux-preferito.reducers";

export interface AppState{
    router: RouterReducerState<any>;
    articoloState: ArticoloState
    utenteState: UtenteState
    adminState: AdminState
    preferitoState: PreferitoState
}

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    articoloState: articoloReducer,
    utenteState: utenteReducer,
    adminState: adminReducer,
    preferitoState: preferitoReducer
}