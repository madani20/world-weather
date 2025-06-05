import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

private subject = new Subject<Weather>()
weather$ = this.subject.asObservable()

updateWeather(weather: Weather): void {
  this.subject.next(weather)
}
}
