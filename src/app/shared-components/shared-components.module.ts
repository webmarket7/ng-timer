import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import { ClassNamePipe } from '../pipes/class-name.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        DataTableComponent,
        ClassNamePipe
    ],
    exports: [
        DataTableComponent,
        ClassNamePipe
    ],
    providers: []
})
export class SharedComponentsModule {
}
