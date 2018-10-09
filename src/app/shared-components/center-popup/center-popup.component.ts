import { Component } from '@angular/core';
import { IFormControl } from '../../common/interfaces';
import { Popup } from '../../common/popup.controller';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-center-popup',
    templateUrl: './center-popup.component.pug',
    styleUrls: ['./center-popup.component.scss']
})
export class CenterPopupComponent extends Popup {

    model: IFormControl[];

    constructor() {
        super();

        this.model = [];
    }

    onClose(formValue) {
        this.close.emit(formValue);
    }
}
