import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsComponent } from './cars/cars.component';
import { CarsRoutingModule } from './cars-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CarsRoutingModule
    ],
    declarations: [
        CarsComponent
    ]
})
export class CarsModule {
}
