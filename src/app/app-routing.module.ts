import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardOverviewComponent} from './components/dashboard-overview/dashboard-overview.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {Pages} from './shared/enums/pages';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: Pages.DASHBOARD, component: DashboardComponent,
    children: [
      {
        path: Pages.CHARACTERS,
        loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule),
        data: {
          pageTitle: Pages.CHARACTERS
        }
      },
      {
        path: Pages.FILMS,
        loadChildren: () => import('./films/films.module').then(m => m.FilmsModule),
        data: {
          pageTitle: Pages.FILMS
        }
      },
      {
        path: Pages.PLANETS,
        loadChildren: () => import('./planets/planets.module').then(m => m.PlanetsModule),
        data: {
          pageTitle: Pages.PLANETS
        }
      },
      {
        path: Pages.SPECIES,
        loadChildren: () => import('./species/species.module').then(m => m.SpeciesModule),
        data: {
          pageTitle: Pages.SPECIES
        }
      },
      {
        path: Pages.STARSHIPS,
        loadChildren: () => import('./starships/starships.module').then(m => m.StarshipsModule),
        data: {
          pageTitle: Pages.STARSHIPS
        }
      },
      {
        path: Pages.VEHICLES,
        loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule),
        data: {
          pageTitle: Pages.VEHICLES
        }
      },

    ]
  },

  // {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
