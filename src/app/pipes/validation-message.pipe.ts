import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'validationMessage'
})
export class ValidationMessagePipe implements PipeTransform {

    transform(errors: any, args?: any): string {

        if (errors) {
            if (errors.required) {

                return 'This field is required';
            }

            if (errors.minlength) {
                return `Min length is ${errors.minlength.requiredLength} chars`;
            }
        }
    }
}
