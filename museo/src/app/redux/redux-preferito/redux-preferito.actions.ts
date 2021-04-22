import { createAction, props } from "@ngrx/store";
import { Response } from 'src/app/core/model/response.interface';

export const initPreferiti = createAction('[Preferiti] init preferiti', props<{response: Response}>())
export const retreiveAllPreferitiOfUtente = createAction('[Preferiti] preferiti');
export const deletePreferito = createAction('[Preferiti] delete Preferito',props<{id:number}>());
export const addToPreferiti = createAction('[Preferiti] add to Preferito',props<{idUtente: number, idArticolo: number}>());

