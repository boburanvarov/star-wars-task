import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmInfoComponent } from './film-info/film-info.component';
import { FilmsListComponent } from './films-list/films-list.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [

  FilmInfoComponent,

  FilmsListComponent],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    SharedModule
  ]
})
export class FilmsModule { }
