import { HttpClient } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { map, Observable, retry, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly http = inject(HttpClient)
  private readonly handlerError = inject(ErrorHandler)

  private cachedWeather$!: Observable<Weather>

  search(keyword: string): Observable<Weather> {
   if(!this.cachedWeather$){
      this.cachedWeather$ = this.http.get<any>(environment.apis.urlSearchByKeywordApiWeatherstack+keyword)
      .pipe(
        retry(2),
        map( response => this.transformWeatherData(response),
        shareReplay(1))
       )
     }
        return this.cachedWeather$
   }

   private transformWeatherData(data: any): Weather {
    return {
      id: crypto.randomUUID().substring(0,6),
      date: new Date(),
      country: data.location.country,
      name: data.location.name,
      region: data.location.region,
      lat: data.location.lat,
      lon: data.location.lon,
      timezoneId: data.location.timezone_id,
      localtime: data.location.localtime,
      observationTime: data.current.observation_time,
      temperature: data.current.temperature,
      windSpeed: data.current.wind_speed,
      windDegree: data.current.wind_degree,
      windDir: data.current.wind_dir,
      pressure: data.current.pressure,
      precip: data.current.precip,
      humidity: data.current.humidity,
      cloudcover: data.current.cloudcover,
      feelslike: data.current.feelslike,
      uvIndex: data.current.uv_index,
      visibility: data.current.visibility,
      isDay: data.current.is_day,
      weatherIcons: data.current.weather_icons,
      weatherDescriptions: data.current.weather_descriptions,
    };
  }
}



