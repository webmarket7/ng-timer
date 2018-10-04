import { Observable, interval } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';

export class Vehicle {

    engineStarted: boolean;
    maxSpeed: number;
    speed$: Observable<number>;

    constructor(
        public type: string
    ) {
        this.maxSpeed = 100;
        this.engineStarted = false;
    }

    get speed() {
        return this.speed$;
    }

    get checkType() {
        return this.type;
    }

    set startEngine(state: boolean) {
        if (!this.engineStarted) {
            this.engineStarted = state;
            console.log('Engine was started');
        } else {
            console.error('Engine is already on');
        }
    }

    accelerate() {
        if (this.engineStarted) {
            this.speed$ = interval(50)
                .pipe(
                    scan((currentSpeed: number) => currentSpeed + 1, 0),
                    takeWhile((currentSpeed: number) => currentSpeed <= this.maxSpeed)
                );
        } else {
            console.error('Engine is not started!');
        }
    }
}
