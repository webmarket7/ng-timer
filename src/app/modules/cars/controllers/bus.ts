import { Vehicle } from './vehicle';

export class Bus extends Vehicle {

    myVariable: number;

    constructor(
        public type: string
    ) {
        super(type);
    }
}
