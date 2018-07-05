import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.pug',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {

    @Input() className: string;
    @Input() head: string[];
    @Input() body: any[];

    @ContentChild('row') row: TemplateRef<any>;

    constructor() {
    }
}
