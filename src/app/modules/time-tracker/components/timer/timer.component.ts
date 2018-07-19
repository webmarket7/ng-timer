import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TimerService } from '../../services/timer.service';
import { Observable, fromEvent } from 'rxjs';
import { scan, startWith, throttleTime, map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.pug',
    styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements AfterViewInit {

    clickActions$: Observable<string>;

    @ViewChild('toggleButton') toggleButton: ElementRef;

    constructor(public timerService: TimerService) {}

    ngAfterViewInit() {
        this.clickActions$ = fromEvent(this.toggleButton.nativeElement, 'click')
            .pipe(
                throttleTime(1000),
                scan((acc) => !acc),
                startWith(false),
                map((state: boolean) => state ? 'started' : 'stopped'),
                tap((command: string) => {
                    this.timerService.commandsStream$.next(command);
                })
            );
    }
}
