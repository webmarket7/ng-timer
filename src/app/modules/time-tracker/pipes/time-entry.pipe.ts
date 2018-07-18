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
        const
            startDate = timeEntry.startDate,
            endDate = timeEntry.endDate;

        return [
            startDate ? this.datePipe.transform(startDate, 'mediumTime') : 'N/D',
            endDate ? this.datePipe.transform(endDate, 'mediumTime') : 'Tracking...',
            startDate && endDate ? this.timePipe.transform(endDate - startDate) : 'Tracking...',
            'action'
        ];
    }
}
