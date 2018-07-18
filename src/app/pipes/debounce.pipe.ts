import { ChangeDetectorRef, NgZone, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'debounce',
    pure: false
})
export class DebouncePipe implements PipeTransform {

    private currentValue: any;
    private transformValue: any;
    private timeoutHandle: any;

    constructor(
        private changeDetector: ChangeDetectorRef,
        private zone: NgZone,
    ) {
        this.currentValue = null;
        this.transformValue = null;
    }

    transform(value: any, debounceTime?: number): any {
        if (this.currentValue == null) {
            this.currentValue = value;
            return value;
        }
        if (this.currentValue === value) {
            clearTimeout(this.timeoutHandle);
            return value;
        }
        if (this.transformValue !== value) {
            this.transformValue = value;
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = setTimeout(() => {
                this.zone.run(() => {
                    this.currentValue = this.transformValue;
                    this.transformValue = null;
                    this.changeDetector.markForCheck();
                });
            }, typeof debounceTime === 'number' ? debounceTime : 300);
        }
        return this.currentValue;
    }
}
