import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../../../common/interfaces';
import { TimerService } from '../services/timer.service';
import { TimePipe } from './time.pipe';

@Pipe({
    name: 'task'
})
export class TaskPipe implements PipeTransform {

    constructor(
        private timerService: TimerService,
        private timePipe: TimePipe
    ) {}

    transform(task: ITask, args?: any): any {
        const logged = task.logged;

        return [
            'toggle',
            task.name,
            task.key === args.activeTask ?
                this.timePipe.transform(args.timer + logged) :
                this.timePipe.transform(logged),
            'action'
        ];
    }

}
