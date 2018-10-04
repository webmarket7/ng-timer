import { Vehicle } from './vehicle';
import { interval } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class Truck extends Vehicle {

    private tonnage: number;
    contains: number;
    gears: number;
    currentGear$: Observable<number>;

    constructor(
        public type: string
    ) {
        super(type);
    }

    set setTonnage(tons: number) {
        this.tonnage = tons;
        this.contains = 0;
    }

    set setGears(gears: number) {
        this.gears = gears;
    }

    haul(tons: number) {
        const contains = this.contains + tons;

        if (contains > this.tonnage) {
            console.error('Not enough place');
            return;
        }

        this.contains = contains;
    }

    accelerate() {
        console.log('Accelerated');

        if (this.engineStarted) {
            this.currentGear$ = interval(1000)
                .pipe(
                    scan((currentGear: number) => currentGear + 1, 0),
                    takeWhile((currentGear: number) => currentGear <= this.gears)
                );
        } else {
            console.error('Engine is not started!');
        }
    }
}
