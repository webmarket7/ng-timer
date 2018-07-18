import { Injectable } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { filter, tap, timestamp, takeUntil, timeInterval, map, mapTo, switchMap, startWith, scan } from 'rxjs/operators';

@Injectable()
export class TimerService {

    commandsStream$: Subject<string>;
    timer$: Observable<number>;

    constructor() {
        this.commandsStream$ = new Subject();

        const
            elapsed = 0,
            inc = acc => elapsed++,
            start$: Observable<string> = this.commandsStream$
                .pipe(
                    filter(command => command === 'start'),
                    timestamp(),
                    tap(timeStamp => console.log('Started at', timeStamp))
                ),
            stop$: Observable<string> = this.commandsStream$
                .pipe(
                    filter(command => command === 'stop'),
                    timestamp(),
                    tap(timeStamp => console.log('Stopped at', timeStamp))
                ),
            counter$: Observable<number> = interval(1000)
                .pipe(
                    takeUntil(stop$),
                    timeInterval(),
                    mapTo(inc)
                );

        this.timer$ = start$
            .pipe(
                switchMap(val => counter$),
                startWith(elapsed),
                scan((acc, curr) => curr(acc)),
                tap(value => console.log('Value', value))
            );
    }
}
