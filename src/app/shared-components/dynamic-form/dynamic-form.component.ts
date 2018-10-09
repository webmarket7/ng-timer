import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormControl, IFormValidators } from '../../common/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.pug',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

    form: FormGroup;
    @Input() controls: IFormControl[];
    @Output() send: EventEmitter<any>;

    static createForm(controls: IFormControl[]) {
        const
            count = controls.length,
            formGroup = {};

        for (let i = 0; i < count; i++) {
            const control = controls[i];

            formGroup[control.key] = new FormControl(control.value || '', DynamicFormComponent.mapValidators(control.validation));
        }

        return formGroup;
    }

    static mapValidators(validators: IFormValidators) {
        const formValidators = [];

        if (validators) {
            for (const item of Object.keys(validators)) {

                switch (item) {
                    case 'required':
                        formValidators.push(Validators.required);
                        break;

                    case 'minLength':
                        formValidators.push(Validators.minLength(validators[item]));
                        break;
                }
            }
        }

        return formValidators;
    }

    constructor() {
        this.controls = [];

        this.send = new EventEmitter();
    }

    ngOnInit() {
        const formGroup = DynamicFormComponent.createForm(this.controls);

        this.form = new FormGroup(formGroup);
    }

    onFormSubmit(form: FormGroup) {
        console.log('Form', form, form.value);

        this.send.emit(form.value);
    }

}
