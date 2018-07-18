import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { entries } from 'lodash';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.pug',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

    started: boolean;

    constructor(
        private timerService: TimerService
    ) {
        this.started = false;
    }

    toggleTimer(event) {
        event.stopPropagation();

        this.started = !this.started;

        this.timerService.commandsStream$.next(this.started ? 'start' : 'stop');
    }
}
