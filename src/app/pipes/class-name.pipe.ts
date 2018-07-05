import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'className'
})
export class ClassNamePipe implements PipeTransform {

    transform(value: string, args?: any): string {

        return value.toLowerCase().replace(' ', '_');
    }

}
