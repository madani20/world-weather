import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsiusToFahrenheit',
  standalone: true
})
export class CelsiusToFharenheitPipe implements PipeTransform {

  transform(value: number): number {
    return  ( (value * 9) / 5 ) + 32  
  }

}
