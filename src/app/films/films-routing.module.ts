import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FilmsListComponent} from "./films-list/films-list.component";
import {FilmInfoComponent} from "./film-info/film-info.component";


const routes: Routes = [
  {
    path: '',
    component: FilmsListComponent
  },
  {
    path: ':id',
    component: FilmInfoComponent,
    data: {
      pageTitle: 'View Film'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
