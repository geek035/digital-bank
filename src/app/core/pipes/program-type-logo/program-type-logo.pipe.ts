import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'programTypeLogo'
})
export class ProgramTypeLogoPipe implements PipeTransform {

  transform(cardProgram: string): string {
    const assetsName =
      (cardProgram === 'МИР' && 'mir.svg') ||
      (cardProgram === 'Maestro' && 'maestro.svg') ||
      (cardProgram == 'Visa' && 'visa.svg') ||
      (cardProgram === 'Mastercard' && 'master card.svg');

    return `/assets/${assetsName}`;
  }

}
