import {Component, Input, ContentChild, TemplateRef, OnChanges, SimpleChanges} from '@angular/core';
import { entryAnimation } from '../../common/animations';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.pug',
    styleUrls: ['./data-table.component.scss'],
    animations: entryAnimation
})
export class DataTableComponent implements OnChanges {

    animationsDisabled: boolean;

    @Input() isLoading: boolean;
    @Input() className: string;
    @Input() head: string[];
    @Input() hideHead?: boolean;
    @Input() body: any[];
    @Input() activeEntry: string;

    @ContentChild('row') row: TemplateRef<any>;

    constructor() {
        this.animationsDisabled = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        const change = changes.isLoading;

        if (change) {
            const isLoading = change.currentValue;

            if (isLoading) {
                this.animationsDisabled = true;
            } else {
                const timeOut = setTimeout(() => {
                    this.animationsDisabled = false;
                }, 1000);
            }
        }
    }

    trackByFn(index, item) {
        return item.key;
    }
}
