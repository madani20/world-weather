import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from '../../../../core/models/weather';
import { SearchBarService } from '../../../../core/services/liaison-search-barr.service';
import { SearchComponent } from "../search/search.component";
import { HistoryService } from '../../../../core/services/history.service';
import { Router } from '@angular/router';
import { CelsiusToFharenheitPipe } from '../../../tools/pipes/celsius-to-fahrenheit.pipe';


@Component({
  selector: 'app-display',
  standalone: true,
  imports: [DatePipe, SearchComponent, CelsiusToFharenheitPipe],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit, OnDestroy{
  private readonly subscription = new Subscription()
  private readonly serviceSearchBar = inject(SearchBarService)
  private readonly serviceHistory = inject(HistoryService)
  private readonly router = inject(Router)
  weather!: Weather | undefined
  theLatestWeather!: Weather | undefined
  
   ngOnInit(): void {
     const sub = this.serviceHistory.getLastWeather().subscribe(weather => { 
        this.theLatestWeather = weather,
        this.subscription.add(sub) 
      }
    )
    const sub1 = this.serviceSearchBar.weather$.subscribe(weather => {
      this.weather = weather
      this.subscription.add(sub1)
      console.log('depuis sub1: ',this.weather)
     })   
 }

  getPropertyTemperature(): number {
    return this.weather ? this.weather.temperature : 0
  }
  getPropertyTemperatureTheLastest(): number {
    return this.theLatestWeather ? this.theLatestWeather.temperature : 0
  }
  goToUrl(url: string) {
    this.router.navigate([url])
  }

    ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
  

}
