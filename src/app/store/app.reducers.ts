import * as fromAuth from '../modules/auth/store/auth.reducers';
import * as fromTimeTracker from '../modules/time-tracker/store/time-tracker.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    timeTracker: fromTimeTracker.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
    timeTracker: fromTimeTracker.timeTrackerReducer,
    auth: fromAuth.authReducer
};
