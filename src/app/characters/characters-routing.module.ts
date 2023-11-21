import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CharactersListComponent} from './characters-list/characters-list.component';
import {CharacterInfoComponent} from './character-info/character-info.component';


const routes: Routes = [
  {
    path: '',
    component: CharactersListComponent
  },
  {
    path: ':id',
    component: CharacterInfoComponent,
    data: {
      pageTitle: 'View Character'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
