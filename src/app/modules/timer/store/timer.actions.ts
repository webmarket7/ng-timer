import { Action } from '@ngrx/store';
import { ITask, ITimeEntry, ITimeStamp } from '../../../common/interfaces';

export enum TimerActionTypes {
    TrackButtonToggled = '[Timer] Track Button Toggled',
    TrackingStarted = '[Timer] Tracking Started',
    TrackingStopped = '[Timer] Tracking Stopped',
    TimeEntryCreated = '[Timer] Time Entry Created',
    TimeEntryUpdated = '[Timer] Time Entry Updated'
}

export class TrackButtonToggled implements Action {
    readonly type = TimerActionTypes.TrackButtonToggled;

    constructor(public payload: {
        task: ITask,
        buttonState: ITimeStamp
    }) {}
}

export class TrackingStarted implements Action {
    readonly type = TimerActionTypes.TrackingStarted;

    constructor(public payload: ITimeEntry) {}
}

export class TrackingStopped implements Action {
    readonly type = TimerActionTypes.TrackingStopped;

    constructor(public payload: {key: string, entry: ITimeEntry}) {}
}

export class TimeEntryCreated implements Action {
    readonly type = TimerActionTypes.TimeEntryCreated;

    constructor(public payload: ITimeEntry) {}
}

export class TimeEntryUpdated implements Action {
    readonly type = TimerActionTypes.TimeEntryUpdated;

    constructor(public payload: ITimeEntry) {}
}



export type TimerActions =
    TrackButtonToggled |
    TrackingStarted |
    TrackingStopped |
    TimeEntryCreated |
    TimeEntryUpdated;
