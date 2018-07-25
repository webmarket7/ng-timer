import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicModule } from 'ng-dynamic-component';
import { DataTableComponent } from './data-table/data-table.component';
import { ClassNamePipe } from '../pipes/class-name.pipe';
import { DebouncePipe } from '../pipes/debounce.pipe';
import { TimePipe } from '../pipes/time.pipe';
import { TimerService } from '../services/timer.service';
import { PopupService } from '../services/popup.service';
import { SidePopupComponent } from './side-popup/side-popup.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicModule
    ],
    declarations: [
        DataTableComponent,
        SidePopupComponent,
        ToggleButtonComponent,
        ClassNamePipe,
        DebouncePipe,
        TimePipe
    ],
    providers: [
        PopupService,
        TimerService,
        TimePipe,
        DatePipe
    ],
    entryComponents: [
        SidePopupComponent
    ],
    exports: [
        DataTableComponent,
        SidePopupComponent,
        ToggleButtonComponent,
        ClassNamePipe,
        DebouncePipe,
        TimePipe
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
