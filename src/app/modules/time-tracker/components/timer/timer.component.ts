import {Component, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { timeInterval } from 'rxjs/operators';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.pug',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements AfterViewInit, OnDestroy {

    counter: Subscription;
    started: boolean;
    elapsed: number;

    constructor() {
        this.started = false;
        this.elapsed = 0;
    }

    ngAfterViewInit() {
        this.counter = interval(1000)
            .pipe(timeInterval())
            .subscribe(x => {
                if (!this.started) {
                    return;
                }

                this.elapsed++;
            });
    }

    ngOnDestroy() {
        this.counter.unsubscribe();
    }

    recordEntry(event) {
        event.stopPropagation();

        if (this.started) {
            this.started = false;

            console.log('Elapsed:', this.elapsed);
        }
    }

    resetTimer(event) {
        event.stopPropagation();

        this.started = false;
        this.elapsed = 0;
    }
}
