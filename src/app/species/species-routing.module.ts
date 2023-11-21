import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SpeciesListsComponent} from './species-lists/species-lists.component';
import {SpecieInfoComponent} from './specie-info/specie-info.component';


const routes: Routes = [
  {
    path: '',
    component: SpeciesListsComponent
  },
  {
    path: ':id',
    component: SpecieInfoComponent,
    data: {
      pageTitle: 'View Specie'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeciesRoutingModule { }
