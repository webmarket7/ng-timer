import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { TimerActionTypes, TrackButtonToggled, TrackingStarted, TrackingStopped } from './timer.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { forkJoin, from, Observable } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { trackedTask, trackedTimeEntry } from './timer.selectors';
import { TasksService } from '../../task/services/tasks.service';
import { TimeEntriesService } from '../../time-entry/services/time-entries.service';
import { ITask, ITimeEntry } from '../../../common/interfaces';
import { roundToSec } from '../../../common/helpers';

@Injectable()
export class TimerEffects {

    trackedTask$: Observable<ITask>;
    trackedTimeEntry$: Observable<ITimeEntry>;

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private timeEntriesService: TimeEntriesService,
        private tasksService: TasksService
    ) {
        this.trackedTask$ = this.store.select(trackedTask).pipe(take(1));
        this.trackedTimeEntry$ = this.store.select(trackedTimeEntry).pipe(take(1));
    }

    @Effect()
    startStop$ = this.actions$
        .pipe(
            ofType<TrackButtonToggled>(TimerActionTypes.TrackButtonToggled),
            switchMap(action => {
                const {task, buttonState} = action.payload;

                return this.trackedTimeEntry$
                    .pipe(
                        map((entry: ITimeEntry) => {

                            switch (buttonState.value) {
                                case 'started':
                                    return {type: TimerActionTypes.TrackingStarted, payload: {
                                        startDate: buttonState.timestamp
                                    }};

                                case 'stopped':
                                    return {type: TimerActionTypes.TrackingStopped, payload: {
                                        key: entry.key,
                                        entry: {endDate: buttonState.timestamp}
                                    }};
                            }
                        })
                    );
            })
        );

    @Effect()
    startTracking$ = this.actions$
        .pipe(
            ofType<TrackingStarted>(TimerActionTypes.TrackingStarted),
            switchMap(action => {
                const payload = action.payload;

                return this.trackedTask$
                    .pipe(
                        take(1),
                        switchMap((task: ITask) => {
                            const timeEntry = {...payload, taskKey: task.key};

                            return from(this.timeEntriesService.addTimeEntry(timeEntry))
                                .pipe(
                                    map((ref: any) => {

                                        return {
                                            type: TimerActionTypes.TimeEntryCreated,
                                            payload: {
                                                key: ref.key,
                                                ...timeEntry
                                            }
                                        };
                                    })
                                );
                        })
                    );
            })
        );

    @Effect()
    stopTracking$ = this.actions$
        .pipe(
            ofType<TrackingStopped>(TimerActionTypes.TrackingStopped),
            switchMap(action => {
                const payload = action.payload;

                return forkJoin(this.trackedTask$, this.trackedTimeEntry$)
                    .pipe(
                        take(1),
                        switchMap((data: any[]) => {
                            const
                                task = data[0],
                                taskKey = task.key,
                                timeEntry = data[1],
                                startDate = timeEntry.startDate,
                                endDate = payload.entry.endDate,
                                logged = task.logged + roundToSec(endDate - startDate);

                            return from(this.tasksService.updateTask(taskKey, {logged}));
                        }),
                        switchMap(() => {

                            return from(this.timeEntriesService.updateTimeEntry(payload.key, payload.entry))
                                .pipe(
                                    map(() => {
                                        return {
                                            type: TimerActionTypes.TimeEntryCreated,
                                            payload: {}
                                        };
                                    })
                                );
                        }),
                    );
            })
        );
}
