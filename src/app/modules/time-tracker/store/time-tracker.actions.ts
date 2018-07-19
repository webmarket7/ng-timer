import { Action } from '@ngrx/store';
import { ITimeEntry } from '../../../common/interfaces';

export const LOAD = 'LOAD';
export const STARTED_TRACKING = 'STARTED_TRACKING';
export const STOPPED_TRACKING = 'STOPPED_TRACKING';

export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAILURE = 'LOAD_FAILURE';
export const ADD_TIME_ENTRY = 'ADD_TIME_ENTRY';
export const UPDATE_TIME_ENTRY = 'UPDATE_TIME_ENTRY';
export const DELETE_TIME_ENTRY = 'DELETE_TIME_ENTRY';
export const SET_ACTIVE_TIME_ENTRY = 'SET_ACTIVE_TIME_ENTRY';

export class LoadAction implements Action {
    readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: ITimeEntry[]) {}
}

export class LoadFailureAction implements Action {
    readonly type = LOAD_FAILURE;
}

export class StartedTrackingAction implements Action {
    readonly type = STARTED_TRACKING;

    constructor(public payload: ITimeEntry) {}
}

export class StoppedTrackingAction implements Action {
    readonly type = STOPPED_TRACKING;

    constructor(public payload: ITimeEntry) {}
}

export class AddTimeEntry implements Action {
    readonly type = ADD_TIME_ENTRY;

    constructor(public payload: ITimeEntry) {}
}

export class UpdateTimeEntry implements Action {
    readonly type = UPDATE_TIME_ENTRY;

    constructor(public payload: {index: number, timeEntry: ITimeEntry}) {}
}

export class DeleteTimeEntry implements Action {
    readonly type = DELETE_TIME_ENTRY;

    constructor(public payload: number) {}
}

export class SetActiveTimeEntry implements Action {
    readonly type = SET_ACTIVE_TIME_ENTRY;

    constructor(public payload: string) {}
}

export type TimeTrackerActions = LoadAction |
                                 StartedTrackingAction |
                                 StoppedTrackingAction |
                                 LoadSuccessAction |
                                 LoadFailureAction |
                                 AddTimeEntry |
                                 SetActiveTimeEntry |
                                 UpdateTimeEntry |
                                 DeleteTimeEntry;
