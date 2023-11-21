import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlanetsListComponent} from './planets-list/planets-list.component';
import {PlanetInfoComponent} from './planet-info/planet-info.component';


const routes: Routes = [
  {
    path: '',
    component: PlanetsListComponent
  },
  {
    path: ':id',
    component: PlanetInfoComponent,
    data: {
      pageTitle: 'View Planet'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetsRoutingModule { }
