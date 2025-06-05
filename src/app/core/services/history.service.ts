import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, retry, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Weather, weathers } from '../models/weather';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly httpClient = inject(HttpClient);
  private readonly handlerError = inject(ErrorHandlerService);
  private cachedWeather$!: Observable<Weather>;
  private cachedWeathers$!: Observable<weathers>;
  /**
   * Récupère le temps de la dernière ville consultée
   */
  getLastWeather(): Observable<Weather> {
    if (!this.cachedWeather$) {
      return this.httpClient
        .get<Weather[]>(environment.apis.urlLocalHistory)
        .pipe(
          retry(2),
          map((weathers) => {
            if (weathers.length === 0) {
              throw new Error('Aucune ville trouvée');
            }
            return weathers.reduce((mostRecent, current) => {
              const mostRecentDate = new Date(mostRecent.date); //converti string en Date pour comparaison facile
              const currentDate = new Date(current.date);
              return currentDate > mostRecentDate ? current : mostRecent;
            });
          }),
          shareReplay(1),
          catchError(this.handlerError.handlerError)
        );
    }
    return this.cachedWeather$;
  }
  /**
   * Récupère toutes les villes consultées
   *
   * @returns
   */

  getAllWeathers(): Observable<weathers> {
    if (!this.cachedWeather$) {
      return this.httpClient
        .get<weathers>(environment.apis.urlLocalHistory)
        .pipe(retry(2), shareReplay(1),
        catchError(this.handlerError.handlerError))        
    }
    return this.cachedWeathers$;
  }

  getWeatherById(weatherId: string): Observable<Weather> {
     if (!this.cachedWeather$) {
    return this.httpClient
      .get<Weather>(`${environment.apis.urlLocalHistory}${weatherId}`)
      .pipe( retry(2), shareReplay(1),
       catchError(this.handlerError.handlerError));
  }
   return this.cachedWeather$;
}

  getWeatherByName(weatherName: string): Observable<Weather> {
     if (!this.cachedWeather$) {
    return this.httpClient
      .get<Weather>(`${environment.apis.urlLocalHistory}${weatherName}`)
      .pipe( retry(2), 
      //tap(data => console.log('depuis getWeatherByName ====>' , data)),
      shareReplay(1),
       catchError(this.handlerError.handlerError))      
  }
   return this.cachedWeather$;
}

searchWeatherListByKeyword(keyword: string): Observable<weathers> {
  return this.httpClient.get<weathers>(`${environment.apis.urlSearchWeathersByKeyword}${keyword}`).pipe(
    tap(response => { console.log(response)})
  )
}
}

