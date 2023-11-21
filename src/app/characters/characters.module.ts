import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharacterInfoComponent } from './character-info/character-info.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
  CharactersListComponent,
  CharacterInfoComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    SharedModule,
  ]
})
export class CharactersModule { }
