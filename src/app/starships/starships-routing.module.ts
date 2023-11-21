import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StarshipsListComponent} from './starships-list/starships-list.component';
import {StarshipInfoComponent} from './starship-info/starship-info.component';


const routes: Routes = [
  {
    path: '',
    component: StarshipsListComponent
  },
  {
    path: ':id',
    component: StarshipInfoComponent,
    data: {
      pageTitle: 'View Starship'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarshipsRoutingModule { }
