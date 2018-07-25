import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../modules/auth/store/auth.reducers';
import * as fromTimer from '../modules/timer/store/timer.reducer';
import * as fromTask from '../modules/task/store/task.reducer';
import * as fromTimeEntry from '../modules/time-entry/store/time-entry.reducer';

export interface AppState {
    auth: fromAuth.AuthState;
    timer: fromTimer.State;
    task: fromTask.State;
    timeEntry: fromTimeEntry.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    timer: fromTimer.reducer,
    task: fromTask.reducer,
    timeEntry: fromTimeEntry.reducer
};
