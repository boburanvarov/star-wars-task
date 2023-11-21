import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeciesRoutingModule } from './species-routing.module';
import { SpecieInfoComponent } from './specie-info/specie-info.component';
import { SpeciesListsComponent } from './species-lists/species-lists.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [

  SpecieInfoComponent,

  SpeciesListsComponent],
  imports: [
    CommonModule,
    SpeciesRoutingModule,
    SharedModule
  ]
})
export class SpeciesModule { }
