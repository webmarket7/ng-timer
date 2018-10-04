import { Component, forwardRef, Injector, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.pug',
    styleUrls: ['./text-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true
        }
    ]
})
export class TextInputComponent implements ControlValueAccessor {

    value: string;

    @Input() id: string;

    private propagateChange = (value: string) => {};

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    constructor(
        private injector: Injector,
    ) {}

    onChange(value: string) {
        this.propagateChange(value);
    }
}
