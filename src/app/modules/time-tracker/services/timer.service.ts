import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { TimeEntriesService } from './time-entries.service';
import { activeTimeEntry } from '../store/time-tracker.selectors';
import * as TimeTrackerActions from '../store/time-tracker.actions';
import { Observable, Subject, interval, Timestamp } from 'rxjs';
import { take, map, filter, timestamp, takeUntil, switchMap, startWith, scan } from 'rxjs/operators';

@Injectable()
export class TimerService {
    elapsed: {value: number, timestamp: number};

    commandsStream$: Subject<string>;
    activeTimeEntry$: Observable<string>;
    timer$: Observable<Timestamp<any>>;

    constructor(
        private store: Store<AppState>,
        private timeEntriesService: TimeEntriesService,
    ) {
        this.activeTimeEntry$ = this.store.select(activeTimeEntry);
        this.commandsStream$ = new Subject();
        this.elapsed = {
            value: 0,
            timestamp: 0
        };

        const
            start$: Observable<void> = this.commandsStream$
                .pipe(
                    filter(command => command === 'start'),
                    timestamp(),
                    map(value => {
                        this.store.dispatch(new TimeTrackerActions.StartedTrackingAction({
                                startDate: value.timestamp
                            })
                        );
                    })
                ),
            stop$: Observable<void> = this.commandsStream$
                .pipe(
                    filter(command => command === 'stop'),
                    timestamp(),
                    switchMap(() => {
                        return this.activeTimeEntry$
                            .pipe(
                                take(1),
                                map((key: string) => {
                                    this.timeEntriesService.updateTimeEntry(key, {
                                        endDate: this.elapsed.timestamp
                                    });
                                })
                            );
                    })
                ),
            counter$: Observable<number> = interval(1000)
                .pipe(
                    takeUntil(stop$)
                );

        this.timer$ = start$
            .pipe(
                switchMap(val => counter$),
                startWith(0),
                scan((acc) => acc += 1000),
                timestamp(),
                map(value => {
                    this.elapsed = value;

                    return value;
                })
            );
    }
}
