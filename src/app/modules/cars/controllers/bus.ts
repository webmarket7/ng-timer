import { Vehicle } from './vehicle';

export class Bus extends Vehicle {

    constructor(
        public type: string
    ) {
        super(type);
    }
}
