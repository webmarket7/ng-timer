import { trigger, style, transition, animate } from '@angular/animations';

export const entryAnimation = [
    trigger('entry', [
        transition(':enter', [
            style({
                opacity: 0,
                transform: 'translate3d(0, -100%, 0)'
            }),
            animate(300)
        ]),
        transition(':leave', [
            animate(300, style({
                opacity: 0,
                transform: 'translate3d(0, -100%, 0)'
            }))
        ])
    ])
];
