import { Params } from "@angular/router";
import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { AdminState } from "./redux-admin.reducers";

export const selectAdminState = (state: AppState) => state.adminState;

export const selectAdmins = createSelector(
    selectAdminState,
    (state: AdminState) => state.admins
);

export const getCurrentAdmin = createSelector(
    selectAdminState,
    (state: AdminState, params: Params) => state.admins.find(item => item.id === Number(params['id']))
);