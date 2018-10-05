import { Vehicle } from './vehicle';

export class Electrocar extends Vehicle {

    constructor(
        public type: string
    ) {
        super(type);
    }
}
