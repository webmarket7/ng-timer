import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { scan, startWith, throttleTime, map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-toggle-button',
    templateUrl: './toggle-button.component.pug',
    styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements AfterViewInit {

    clickActions$: Observable<string>;

    @Input() buttonType: string;
    @Input() service: any;
    @Input() taskKey?: string;

    @ViewChild('toggleButton') toggleButton: ElementRef;

    constructor() {}

    ngAfterViewInit() {
        console.log('Task key', this.taskKey);

        this.clickActions$ = fromEvent(this.toggleButton.nativeElement, 'click')
            .pipe(
                throttleTime(1000),
                scan((acc) => !acc),
                startWith(false),
                map((state: boolean) => state ? 'started' : 'stopped'),
                tap((command: string) => {
                    this.service.commandsStream$.next(command);
                })
            );
    }
}
