import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicModule } from 'ng-dynamic-component';
import { DataTableComponent } from './data-table/data-table.component';
import { ClassNamePipe } from '../pipes/class-name.pipe';
import { DebouncePipe } from '../pipes/debounce.pipe';
import { TimePipe } from '../pipes/time.pipe';
import { ValidationMessagePipe } from '../pipes/validation-message.pipe';

import { TimerService } from '../services/timer.service';
import { PopupService } from '../services/popup.service';

import { SidePopupComponent } from './side-popup/side-popup.component';
import { CenterPopupComponent } from './center-popup/center-popup.component';

import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { TextInputComponent } from './text-input/text-input.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DynamicModule
    ],
    declarations: [
        DataTableComponent,
        SidePopupComponent,
        ToggleButtonComponent,
        TextInputComponent,
        DynamicFormComponent,
        CenterPopupComponent,
        ReactiveFormComponent,

        ClassNamePipe,
        DebouncePipe,
        TimePipe,
        ValidationMessagePipe
    ],
    providers: [
        PopupService,
        TimerService,
        TimePipe,
        DatePipe
    ],
    entryComponents: [
        SidePopupComponent,
        CenterPopupComponent
    ],
    exports: [
        DataTableComponent,
        SidePopupComponent,
        ToggleButtonComponent,
        TextInputComponent,
        DynamicFormComponent,
        CenterPopupComponent,
        ReactiveFormComponent,

        ClassNamePipe,
        DebouncePipe,
        TimePipe,
        ValidationMessagePipe
    ]
})
export class SharedComponentsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedComponentsModule,
            providers: [
                PopupService,
                TimerService,
                TimePipe,
                DatePipe
            ]
        };
    }

}
