import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicModule } from 'ng-dynamic-component';
import { DataTableComponent } from './data-table/data-table.component';
import { ClassNamePipe } from '../pipes/class-name.pipe';
import { DebouncePipe } from '../pipes/debounce.pipe';
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
    ],
    providers: [
        PopupService
    ],
    entryComponents: [
        SidePopupComponent
    ],
    exports: [
        DataTableComponent,
        SidePopupComponent,
        ToggleButtonComponent,
        ClassNamePipe,
        DebouncePipe
    ]
})
export class SharedComponentsModule {
}
