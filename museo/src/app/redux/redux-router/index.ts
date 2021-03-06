import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, State } from '@ngrx/store';
import { AppState } from '..';

//export const selectRouteState = (state: AppState) => state.router;

export const selectRouter = createFeatureSelector<
    AppState,
    RouterReducerState<any>
>('router');

export const {
    selectCurrentRoute,   // select the current route
    selectFragment,       // select the current route fragment
    selectQueryParams,    // select the current route query params
    selectQueryParam,     // factory function to select a query param
    selectRouteParams,    // select the current route params
    selectRouteParam,     // factory function to select a route param
    selectRouteData,      // select the current route data
    selectUrl,            // select the current url
} = getSelectors(selectRouter);