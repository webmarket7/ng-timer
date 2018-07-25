import { Action } from '@ngrx/store';
import { ITask, ITimeEntry } from '../../../common/interfaces';

export enum TimeEntryActionTypes {
    TimeEntriesRequested = '[TimeEntry] Time Entries Requested',
    TimeEntriesLoaded = '[TimeEntry] Time Entries Loaded'
}

export class TimeEntriesRequested implements Action {
    readonly type = TimeEntryActionTypes.TimeEntriesRequested;

    constructor(public payload: ITask) {}
}

export class TimeEntriesLoaded implements Action {
    readonly type = TimeEntryActionTypes.TimeEntriesLoaded;

    constructor(public payload: ITimeEntry[]) {}
}

export type TimeEntryActions =
    TimeEntriesRequested |
    TimeEntriesLoaded;
