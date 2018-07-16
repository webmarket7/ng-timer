import { Action } from '@ngrx/store';
import { ITimeEntry } from '../../../common/interfaces';

export const LOAD = 'LOAD';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAILURE = 'LOAD_FAILURE';

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


export const ADD_TIME_ENTRY = 'ADD_TIME_ENTRY';
export const UPDATE_TIME_ENTRY = 'UPDATE_TIME_ENTRY';
export const UPDATE_TIME_ENTRIES = 'UPDATE_TIME_ENTRIES';
export const DELETE_TIME_ENTRY = 'DELETE_TIME_ENTRY';

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

export type TimeTrackerActions = LoadAction | LoadSuccessAction | LoadFailureAction | AddTimeEntry | UpdateTimeEntry | DeleteTimeEntry;
