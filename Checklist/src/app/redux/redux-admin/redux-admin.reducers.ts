import { createReducer, Action, on } from "@ngrx/store";
import { Admin } from "src/app/core/model/model-data/admin.interface";
import { initAdmin } from "./redux-admin.actions";


export interface AdminState {
    admins: Admin[];
}

export const initialState: AdminState = {
    admins: [],
    
};

export const adminReducer = createReducer(
    initialState,
    on(initAdmin, (state, { response }) => ({ ...state, admins: response.result })),  
);

export function reducer(state: AdminState, action: Action) {
    return adminReducer(state, action);
}