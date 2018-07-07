import { Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as TimeTrackerActions from '../../storage/time-tracker.actions';
import { getTimeStamp } from '../../../../common/helpers';
import { GlobalServiceService } from '../../../../services/global-service.service';
import { entries } from 'lodash';
import { ITimeEntry } from '../../../../common/interfaces';

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
        private store: Store<any>,
        private globalService: GlobalServiceService
    ) {
        this.started = false;
        this.elapsed = 0;
    }

    ngOnInit() {
        this.globalService.getEntries()
            .subscribe(
                (timeEntries: ITimeEntry[]) => {
                    this.store.dispatch(new TimeTrackerActions.UpdateTimeEntries(timeEntries));
                },
                (error) => console.error(error)
            );
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
        event.stopPropagation();

        if (this.started) {
            this.started = false;

            this.endDate = getTimeStamp();

            const timeEntry = {
                id: 1,
                task: 'Default name',
                startDate: this.startDate,
                endDate: this.endDate,
                duration: this.elapsed
            };

            this.globalService.storeEntry(timeEntry)
                .subscribe(
                    (response) => console.log('Response', response),
                    (error) => console.error('Error', error)
                    );

            this.store.dispatch(new TimeTrackerActions.AddTimeEntry(timeEntry));
        }
    }

    resetTimer(event) {
        event.stopPropagation();

        this.started = false;
        this.elapsed = 0;
    }
}
