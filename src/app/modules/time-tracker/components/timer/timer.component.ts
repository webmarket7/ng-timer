import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { Subscription, fromEvent } from 'rxjs';
import { scan, startWith, throttleTime } from 'rxjs/operators';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.pug',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements AfterViewInit {

    clickActions$: Subscription;
    buttonState: boolean;

    @ViewChild('toggleButton') toggleButton: ElementRef;

    constructor(
        public timerService: TimerService,
        private cdr: ChangeDetectorRef
    ) {}

    ngAfterViewInit() {
        this.clickActions$ = fromEvent(this.toggleButton.nativeElement, 'click')
            .pipe(
                throttleTime(1000),
                scan((acc) => !acc),
                startWith(false)
            )
            .subscribe(state => {
                this.buttonState = state;
                this.timerService.commandsStream$.next(state ? 'start' : 'stop');
            });

        this.cdr.detectChanges();
    }
}
