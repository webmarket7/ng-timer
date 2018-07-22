import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SidePopup} from '../../common/popup.controller';
import { sidePopupAnimation } from '../../common/animations';

@Component({
    selector: 'app-side-popup',
    templateUrl: './side-popup.component.pug',
    styleUrls: ['./side-popup.component.scss'],
    animations: sidePopupAnimation
})
export class SidePopupComponent extends SidePopup {

    hostForm: FormGroup;
    outputs: {formReady: (form: FormGroup) => void};
    inputs: {patchData: any};

    @Input() data: {
        component: any,
        patchData?: any
    };

    constructor(
        private fb: FormBuilder
    ) {
        super();
        this.hostForm = this.fb.group({});
        this.inputs = {
            patchData: this.data ? this.data.patchData : {}
        };
        this.outputs = {
            formReady: (form: FormGroup) => {
                this.hostForm.setControl('projectedFormGroup', form);
            }
        };
    }

    onSubmit(form: FormGroup) {
        if (form && form.controls && form.controls.projectedFormGroup) {
            const formData = form.controls.projectedFormGroup.value;

            this.close.emit(formData);
        } else {
            console.error('Something went wrong!');
        }
    }

    onCancel() {
        this.close.emit();
    }
}
