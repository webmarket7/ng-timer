import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TimePipe } from './time.pipe';
import { ITimeEntry } from '../../../common/interfaces';

@Pipe({
    name: 'timeEntry'
})
export class TimeEntryPipe implements PipeTransform {

    constructor(
        private datePipe: DatePipe,
        private timePipe: TimePipe
    ) {}

    transform(timeEntry: ITimeEntry, args?: any): string[] {

        return [
            timeEntry.task,
            this.datePipe.transform(timeEntry.startDate, 'shortTime'),
            this.datePipe.transform(timeEntry.endDate, 'shortTime'),
            this.timePipe.transform(timeEntry.duration),
            'action'
        ];
    }

}
