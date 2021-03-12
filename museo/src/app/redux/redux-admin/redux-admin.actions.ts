import { createAction, props } from "@ngrx/store";
import { Admin } from "src/app/core/model/model-data/admin.interface";
import { Response } from 'src/app/core/model/response.interface';

export const retreiveAllAdmins = createAction('[Admin] retrieve');

export const createAdmin = createAction('[Admin] create', props<{
    username: string, 
    password: string, 
    roles: string
}>());

export const updateAdmin = createAction('[Admin] update', props<{
    id:string, 
    username: string, 
    password: string, 
    roles: string
}>());

export const deleteAdmin = createAction('[Admin] delete', props<{id:string}>());
export const loginAdmin = createAction('[Admin] login', props<{
    username: string, 
    password: string
}>());

export const loginAdminUserSuccess = createAction('[User] Login Success', props<{admin: Admin}>());
export const loginAdminUserFailure = createAction('[User] Login Failure', props<{error: string}>());

export const initAdmin = createAction('[AdminInit] init', props<{response: Response}>());
export const initUserAdmin = createAction('[UserInit] init', props<{admin: Admin}>());
