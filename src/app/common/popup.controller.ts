import { EventEmitter, HostListener, HostBinding } from '@angular/core';

export class Popup {
    close: EventEmitter<any>;

    @HostListener('document:keyup', ['$event']) onDocumentKeyUp(event) {
        if (event.code === 'Escape') {
            this.dismiss();
        }
    }

    constructor() {
        this.close = new EventEmitter();
    }

    dismiss(params?) {
        this.close.emit(params);
    }
}

export class SidePopup extends Popup {
    @HostBinding('@bg') popupAnimation = true;

    constructor() {
        super();
    }
}
