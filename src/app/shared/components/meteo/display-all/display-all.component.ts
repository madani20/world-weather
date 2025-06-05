import { DatePipe, NgFor } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { Weather, weathers } from '../../../../core/models/weather';
import { HistoryService } from '../../../../core/services/history.service';

@Component({
  selector: 'app-display-all',
  standalone: true,
  imports: [DatePipe, RouterLink, NgFor, NgxPaginationModule, FormsModule, MatIconModule],
  
  templateUrl: './display-all.component.html',
  styleUrl: './display-all.component.css',
})
export class DisplayAllComponent implements OnDestroy, OnInit {
  private readonly historyService = inject(HistoryService);
  private readonly router = inject(Router);
  private readonly subscription = new Subscription();

  keyword!: string
  errorMessage: string = '';
  p: number = 1
  weathers!: weathers
  weather!: Weather

   ngOnInit(): void {
    this.loadWeathers()
   }
  
  viewWeatherDetails(weaterId: string) {
    this.router.navigate(['details', weaterId]);
  }
  goToUrl(url: string): void {
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe;
  }
  searchWeatherByName(): void{
    const filteredWeather = this.weathers.find( weather => weather.name === this.keyword )
    this.router.navigate(['details'], { state: {  fWeather: filteredWeather} }) 
   }

  /**************
   * Private method
   *************/

 private loadWeathers(): void {
    const sub = this.historyService.getAllWeathers().subscribe({
      next: (weathers) => {
       this.weathers = weathers
      },
      error: (error) => {
        this.errorMessage = error.message
      }
    })
     this.subscription.add(sub);
  }
}
