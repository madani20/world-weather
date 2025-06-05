import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayComponent } from '../display/display.component';
import { HistoryService } from '../../../../core/services/history.service';
import { Weather } from '../../../../core/models/weather';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CelsiusToFharenheitPipe } from '../../../tools/pipes/celsius-to-fahrenheit.pipe';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [DisplayComponent, DatePipe, CelsiusToFharenheitPipe],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css',
})
export class WeatherDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
   private readonly router = inject(Router)
  private readonly historyService = inject(HistoryService)
  private readonly subscription = new Subscription()

  weather!: Weather | undefined 
  weatherFiltered!: Weather | undefined 
  
  ngOnInit(): void {
    const weatherId = this.activatedRoute.snapshot.params['id'] 
    if(weatherId!==undefined){
      const sub = this.historyService.getWeatherById(weatherId).subscribe({
      next: (data) => {
        this.weather = data
       }      
    })
    this.subscription.add(sub)
    }else{
      this.weatherFiltered = history.state.fWeather // variable transmise depuis display-all => fWeather
    }
  }
   getPropertyTemperature(): number {
    return this.weather ? this.weather.temperature : 0
  }
  getPropertyTemperatureTheLastest(): number {
    return this.weatherFiltered ? this.weatherFiltered.temperature : 0
  }
  goToUrl(url: string) {
    this.router.navigate([url])
  }

  ngOnDestroy(): void {
    if(this.subscription)
    this.subscription.unsubscribe()
  }
}
