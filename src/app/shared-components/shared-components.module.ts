import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicModule } from 'ng-dynamic-component';
import { DataTableComponent } from './data-table/data-table.component';
import { ClassNamePipe } from '../pipes/class-name.pipe';
import { DebouncePipe } from '../pipes/debounce.pipe';
import { PopupService } from '../services/popup.service';
import { SidePopupComponent } from './side-popup/side-popup.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DynamicModule
    ],
    declarations: [
        DataTableComponent,
        SidePopupComponent,
        ClassNamePipe,
        DebouncePipe
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
        ClassNamePipe,
        DebouncePipe
    ]
})
export class SharedComponentsModule {
}
