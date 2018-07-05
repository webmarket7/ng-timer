import { Component, OnInit } from '@angular/core';
import { ITimeEntry } from '../../../../common/interfaces';

@Component({
    selector: 'app-time-tracker',
    templateUrl: './time-tracker.component.pug',
    styleUrls: ['./time-tracker.component.scss']
})
export class TimeTrackerComponent implements OnInit {

    tableHead: string[];
    timeEntries: ITimeEntry[];

    constructor() {
        this.tableHead = [
            'task',
            'start date',
            'end date',
            'duration',
            'action'
        ];

        this.timeEntries = [
            {
                id: 1,
                task: 'Default task',
                startDate: 1530778148447,
                endDate: 530778171633,
                duration: 60000
            },
            {
                id: 2,
                task: 'Default task 2',
                startDate: 1530778148447,
                endDate: 530778171633,
                duration: 60000
            },
        ];
    }

    ngOnInit() {
    }

}
