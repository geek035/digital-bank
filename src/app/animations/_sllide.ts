import { trigger, style, transition, animate } from '@angular/animations';

export const slideInOutY = trigger('slideInOutY', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)', // Начальная позиция (снаружи)
      opacity: 0  // Начальное значение непрозрачности
    }),
    animate(
      '500ms ease-in',
      style({ 
        transform: 'translateY(0)', // Окончательная позиция (на месте)
        opacity: 1  // Окончательное значение непрозрачности
      })
    )
  ]),
  transition(':leave', [
    animate(
      '500ms ease-in',
      style({ 
        transform: 'translateY(-100%)', // Уходит вверх
        opacity: 0  // Прозрачность уменьшается
      })
    )
  ])
]);
