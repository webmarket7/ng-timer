import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time'
})
export class TimePipe implements PipeTransform {

    static format(value) {
        return value < 10 ? '0' + value : value;
    }

    transform(value: number, args?: any): string {
        const TIME = new Date(Math.round(value));
        const HOURS = TimePipe.format(TIME.getUTCHours());
        const MINUTES = TimePipe.format(TIME.getUTCMinutes());
        const SECONDS = TimePipe.format(TIME.getUTCSeconds());

        return `${HOURS}:${MINUTES}:${SECONDS}`;
    }
}
