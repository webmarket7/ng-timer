import { Action } from '@ngrx/store';
import { ITimeEntry } from '../../../common/interfaces';

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

export class UpdateTimeEntries implements Action {
    readonly type = UPDATE_TIME_ENTRIES;

    constructor(public payload: ITimeEntry[]) {}
}

export class DeleteTimeEntry implements Action {
    readonly type = DELETE_TIME_ENTRY;

    constructor(public payload: number) {}
}

export type TimeTrackerActions = AddTimeEntry | UpdateTimeEntry | UpdateTimeEntries | DeleteTimeEntry;
