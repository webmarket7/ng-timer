import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { ClassNamePipe } from '../pipes/class-name.pipe';
import { DebouncePipe } from '../pipes/debounce.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        DataTableComponent,
        ClassNamePipe,
        DebouncePipe
    ],
    exports: [
        DataTableComponent,
        ClassNamePipe,
        DebouncePipe
    ],
    providers: []
})
export class SharedComponentsModule {
}
