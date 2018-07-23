import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducers';
import { Observable, interval } from 'rxjs';
import { share, map, filter, takeUntil, switchMap, endWith } from 'rxjs/operators';
import { trackButton, trackedTask } from '../store/time-tracker.selectors';

@Injectable()
export class TimerService {

    trackedTask$: Observable<string>;
    trackButtonState$: Observable<string>;
    timer$: Observable<number>;

    constructor(
        private store: Store<AppState>
    ) {
        this.trackedTask$ = this.store.select(trackedTask);
        this.trackButtonState$ = this.store.select(trackButton);

        const
            start$: Observable<string | void> = this.trackButtonState$
                .pipe(
                    filter(state => state === 'started'),
                    share()
                ),
            stop$: Observable<string | void> = this.trackButtonState$
                .pipe(
                    filter(state => state === 'stopped'),
                    share()
                ),
            counter$: Observable<number> = interval(1000)
                .pipe(
                    takeUntil(stop$)
                );

        this.timer$ = start$
            .pipe(
                switchMap(() => {
                    return counter$.pipe(endWith(-1));
                }),
                map((val: number) => (val + 1) * 1000),
                share()
            );
    }
}
