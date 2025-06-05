import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Weather } from '../models/weather';
import { environment } from '../../../environments/environment.development';
import { ErrorHandlerService } from './error-handler.service';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  private readonly http = inject(HttpClient)
  private readonly errorHandler = inject(ErrorHandlerService)
  private weatherToBackup!: Weather
/**
 * 
 * @param weatherToBackup 
 */
 public backupWeather(weatherToBackup: Weather): void{
   this.weatherToBackup = weatherToBackup
   this.http.post<Weather>(environment.apis.urlToBackup, this.weatherToBackup).pipe(
    tap( data => (console.log(data.name, 'sauvegardé avec succès!')) ),
    catchError(this.errorHandler.handlerError)
   ).subscribe()
     
 }
}
