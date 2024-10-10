import { trigger, style, transition, animate, state } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
    state('in', style({ opacity: 1 })),
    transition(':enter', [
      style({ opacity: 0 }),
      animate(300) // Плавное появление за 300 миллисекунд
    ]),
    transition(':leave', [
      animate(300, style({ opacity: 0 })) // Плавное исчезновение за 300 миллисекунд
    ])
  ])