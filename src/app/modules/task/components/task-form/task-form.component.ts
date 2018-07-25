import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.pug',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

    form: FormGroup;

    @Input() patchData: any;
    @Output() formReady: EventEmitter<FormGroup>;

    constructor(
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required]
        });

        this.formReady = new EventEmitter();
    }

    ngOnInit() {
        if (this.patchData) {
            this.form.patchValue(this.patchData);
        }

        this.formReady.emit(this.form);
    }
}
