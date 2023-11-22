import { trigger, transition, style, query, animateChild, group, animate } from "@angular/animations";


const FADE = [
    style({ opacity: 0 }), 
    animate(1000, style({opacity: 1}))
    ]
const RIGHT_TO_CENTER = [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
    group([
        query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ]),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))]),
    ])]

const LEFT_TO_CENTER = [
    query(':enter, :leave', [
        style({
            position: 'fixed',
            width: '100%'
        })
    ]),
    query(':enter', [
        style({ left: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
        query(':leave', [
            animate('500ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
            animate('500ms ease-out', style({ left: '0%' }))
        ]),
    ])
]
export const routerTransition = trigger('routerTransition', [
    transition('* <=> *', FADE)
])

