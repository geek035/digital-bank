import { trigger, style, transition, animate } from '@angular/animations';

export const slideInOutY = trigger('slideInOutY', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)', 
      opacity: 0  
    }),
    animate(
      '500ms ease-in',
      style({ 
        transform: 'translateY(0)', 
        opacity: 1,
      })
    )
  ]),
  transition(':leave', [
    animate(
      '500ms ease-in',
      style({ 
        transform: 'translateY(-100%)', 
        opacity: 0,
      })
    )
  ])
]);
