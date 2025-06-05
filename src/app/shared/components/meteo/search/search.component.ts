import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Weather } from '../../../../core/models/weather';
import { BackupService } from '../../../../core/services/backup.service';
import { SearchBarService } from '../../../../core/services/liaison-search-barr.service';
import { SearchService } from '../../../../core/services/search.service';
import { MainComponent } from "../../../../layout/main/main.component";
import { DisplayComponent } from "../display/display.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, DisplayComponent, MainComponent, MatProgressSpinnerModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnDestroy {
  private readonly serviceSearch = inject(SearchService)
  private readonly backupService = inject(BackupService)
  private readonly serviceSearchBar = inject(SearchBarService)
  private readonly subscription = new Subscription()
 
  keyword: string = ''
  result!: Weather | string
  isLoading: boolean = false
  
  submitToSearch(): void {
    this.isLoading = true
  if(this.keyword.trim()){
    const sub = this.serviceSearch.search(this.keyword).subscribe(
      (data) => {
      this.result = data
      this.serviceSearchBar.updateWeather(this.result) //Mise  à disposition de l'objet result pour le composant display  
      this.backupService.backupWeather(this.result) 
      this.subscription.add(sub)
      this.isLoading = false
      },
      error => {
        console.error('Error fetching search result', error)
        this.isLoading = false
      }      
    ) 
  }else {
    []
  } 
}

  ngOnDestroy(): void {
    if(this.subscription) 
    this.subscription.unsubscribe()
    
  }
 

}
