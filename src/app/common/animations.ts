import { group, query, state, trigger, style, transition, animate } from '@angular/animations';

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

export const sidePopupAnimation = [
    trigger('bg', [
        state('void', style({
            visibility: 'hidden',
            'pointer-events': 'none',
            'z-index': 1
        })),
        transition(':enter', [
            group([
                animate(200, style({
                    visibility: 'visible'
                })),
                query('.side-popup_background', [
                    style({
                        opacity: 0
                    }),
                    animate(200, style({
                        opacity: 1
                    }))
                ]),
                query('.side-popup_window', [
                    style({
                        transform: 'translate3d(100%, 0, 0)'
                    }),
                    animate(250, style({
                        transform: 'translate3d(0, 0, 0)'
                    }))
                ])
            ])
        ]),
        transition(':leave', group([
            query('.side-popup_background', [
                style({
                    opacity: 1
                }),
                animate(150, style({
                    opacity: 0
                }))
            ]),
            query('.side-popup_window', [
                style({
                    transform: 'translate3d(0, 0, 0)'
                }),
                animate(200, style({
                    transform: 'translate3d(100%, 0, 0)'
                }))
            ])
        ]))
    ])
];
