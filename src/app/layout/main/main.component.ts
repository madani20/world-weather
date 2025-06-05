import { Component } from '@angular/core';
import { DisplayComponent } from "../../shared/components/meteo/display/display.component";
import { SearchComponent } from "../../shared/components/meteo/search/search.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchComponent, DisplayComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent  { 
}
