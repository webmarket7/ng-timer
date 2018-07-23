import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime, timestamp, map } from 'rxjs/operators';
import * as TimeTrackerActions from '../../modules/time-tracker/store/time-tracker.actions';
import { ITask } from '../../common/interfaces';

@Component({
    selector: 'app-toggle-button',
    templateUrl: './toggle-button.component.pug',
    styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements AfterViewInit, OnDestroy {

    clickActions$: Subscription;

    @Input() buttonType: string;
    @Input() buttonState?: string;
    @Input() trackedTask?: ITask;
    @Input() task?: ITask;

    @ViewChild('toggleButton') toggleButton: ElementRef;

    constructor(
        private store: Store<AppState>
    ) {}

    ngAfterViewInit() {
        this.clickActions$ = fromEvent(this.toggleButton.nativeElement, 'click')
            .pipe(
                throttleTime(1000),
                map(() => this.buttonState === 'stopped' ? 'started' : 'stopped'),
                timestamp()
            )
            .subscribe((action: {timestamp: number, value: string}) => {
                this.store.dispatch(new TimeTrackerActions.ToggledTrackButtonAction({
                    task: this.task,
                    buttonState: action
                }));
            });
    }

    ngOnDestroy() {
        this.clickActions$.unsubscribe();
    }
}
