import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { meteoRoutes } from './meteo.routes';
import { NotFoundComponent } from './layout/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: '',
        children: meteoRoutes
    },
    {
        path:'**',
        component: NotFoundComponent
    }
];
