import { Routes } from "@angular/router";
import { SearchComponent } from "./shared/components/meteo/search/search.component";
import { DisplayAllComponent } from "./shared/components/meteo/display-all/display-all.component";
import { DisplayComponent } from "./shared/components/meteo/display/display.component";
import { WeatherDetailsComponent } from "./shared/components/meteo/weather-details/weather-details.component";

export const meteoRoutes: Routes = [
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'weathers',
        component: DisplayAllComponent
    },
    {
        path: 'display',
        component: DisplayComponent
    },
    {
        path: 'details/:id',
        component: WeatherDetailsComponent
    },
    {
        path: 'details',
        component: WeatherDetailsComponent
    }
] 