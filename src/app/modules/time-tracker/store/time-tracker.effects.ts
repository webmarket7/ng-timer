import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, of, from, Observable } from 'rxjs';
import { take, switchMap, map, catchError, tap } from 'rxjs/operators';
import { ITask, ITimeEntry } from '../../../common/interfaces';
import { TimeEntriesService } from '../services/time-entries.service';
import { TasksService } from '../tasks.service';
import { AppState } from '../../../store/app.reducers';
import { activeTimeEntry, trackedTask } from './time-tracker.selectors';
import * as TimeTrackerActions from './time-tracker.actions';
import { roundToSec } from '../../../common/helpers';

@Injectable()
export class TimeTrackerEffects {

    trackedTask$: Observable<ITask>;
    activeTimeEntry$: Observable<string>;

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private timeEntriesService: TimeEntriesService,
        private tasksService: TasksService
    ) {
        this.activeTimeEntry$ = this.store.select(activeTimeEntry).pipe(take(1));
        this.trackedTask$ = this.store.select(trackedTask).pipe(take(1));
    }

    @Effect()
    loadTimeEntries$ = this.actions$
        .ofType(TimeTrackerActions.TE_LOAD)
        .pipe(
            switchMap(() => {
                return this.timeEntriesService.getList()
                    .pipe(
                        map((timeEntries: ITimeEntry[]) => {
                            return {type: TimeTrackerActions.TE_LOAD_SUCCESS, payload: timeEntries};
                        }),
                        catchError((error) => {
                            return of({type: TimeTrackerActions.TE_LOAD_FAILURE});
                        })
                    );
            })
        );

    @Effect()
    startStop$ = this.actions$
        .ofType(TimeTrackerActions.TOGGLED_TRACK_BUTTON)
        .pipe(
            switchMap((action: TimeTrackerActions.ToggledTrackButtonAction) => {
                const {task, buttonState} = action.payload;

                return this.activeTimeEntry$
                    .pipe(
                        map((entry: ITimeEntry) => {

                            switch (buttonState.value) {
                                case 'started':
                                    return {type: TimeTrackerActions.STARTED_TRACKING, payload: {
                                        startDate: buttonState.timestamp
                                    }};

                                case 'stopped':
                                    return {type: TimeTrackerActions.STOPPED_TRACKING, payload:                          {
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
        .ofType(TimeTrackerActions.STARTED_TRACKING)
        .pipe(
            switchMap((action: TimeTrackerActions.StartedTrackingAction) => {
                const payload = action.payload;

                return from(this.timeEntriesService.addTimeEntry(payload))
                    .pipe(
                          map((ref: any) => {
                              return {
                                  type: TimeTrackerActions.SET_ACTIVE_TIME_ENTRY,
                                  payload: {
                                      key: ref.key,
                                      startDate: payload.startDate
                                  }
                              };
                          }),
                        catchError((error) => {
                            return of({type: TimeTrackerActions.TE_LOAD_FAILURE});
                        })
                    );
            })
        );

    @Effect()
    stopTracking$ = this.actions$
        .ofType(TimeTrackerActions.STOPPED_TRACKING)
        .pipe(
            switchMap((action: TimeTrackerActions.StoppedTrackingAction) => {
                const payload = action.payload;

                return from(this.timeEntriesService.updateTimeEntry(payload.key, payload.entry))
                    .pipe(
                        switchMap(() => {
                            return forkJoin(this.trackedTask$, this.activeTimeEntry$)
                                .pipe(
                                    take(1),
                                    tap((data: any[]) => {
                                        const
                                            task = data[0],
                                            timeEntry = data[1],
                                            startDate = timeEntry.startDate,
                                            endDate = payload.entry.endDate,
                                            logged = task.logged + roundToSec(endDate - startDate);

                                        this.tasksService.updateTask(task.key, {logged});
                                    })
                                );
                        }),
                        map(() => {
                            return {
                                type: TimeTrackerActions.SET_ACTIVE_TIME_ENTRY,
                                payload: {
                                    key: '',
                                    startDate: 0
                                }
                            };
                        }),
                        catchError((error) => {
                            return of({type: TimeTrackerActions.TE_LOAD_FAILURE});
                        })
                    );
            })
        );

    @Effect()
    loadTasks$ = this.actions$
        .ofType(TimeTrackerActions.TASKS_LOAD)
        .pipe(
            switchMap(() => {
                return this.tasksService.getList()
                    .pipe(
                        map((tasks: ITask[]) => {
                            return {type: TimeTrackerActions.TASKS_LOAD_SUCCESS, payload: tasks};
                        }),
                        catchError((error) => {
                            return of({type: TimeTrackerActions.TASKS_LOAD_FAILURE});
                        })
                    );
            })
        );

    @Effect({dispatch: false})
    createTask$ = this.actions$
        .ofType(TimeTrackerActions.CREATED_TASK)
        .pipe(
            switchMap((action: TimeTrackerActions.CreatedTaskAction) => {
                return this.tasksService.addTask(action.payload);
            })
        );
}
