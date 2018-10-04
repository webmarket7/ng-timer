import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../controllers/vehicle';
import { Truck } from '../controllers/truck';

@Component({
    selector: 'app-cars',
    templateUrl: './cars.component.pug',
    styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

    car: Vehicle;
    truck: Truck;

    constructor() {
    }

    ngOnInit() {
        this.car = new Vehicle('Car');
        this.truck = new Truck('Truck');
        this.truck.setTonnage = 10;
        this.truck.setGears = 5;
    }
}
