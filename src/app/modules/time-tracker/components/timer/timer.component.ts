import { Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { TimeEntriesService } from '../../services/time-entries.service';
import { getTimeStamp } from '../../../../common/helpers';
import { entries } from 'lodash';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.pug',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit, OnDestroy {

    counter: Subscription;
    started: boolean;
    startDate: number;
    endDate: number;
    elapsed: number;

    constructor(
        private timeEntriesService: TimeEntriesService
    ) {
        this.started = false;
        this.elapsed = 0;
    }

    ngOnInit() {
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

    toggleTimer(event) {
        event.stopPropagation();

        if (!this.started && this.elapsed === 0) {
            this.startDate = getTimeStamp();
        }

        this.started = !this.started;
    }

    recordEntry(event) {
        if (this.started) {
            this.started = false;
            this.endDate = getTimeStamp();

            const timeEntry = {
                startDate: this.startDate,
                endDate: this.endDate,
                duration: this.elapsed
            };

            this.timeEntriesService.addTimeEntry(timeEntry);

            this.elapsed = 0;
        }
    }

    resetTimer(event) {
        event.stopPropagation();

        this.started = false;
        this.elapsed = 0;
    }
}
