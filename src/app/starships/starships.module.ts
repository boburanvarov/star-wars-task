import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipsRoutingModule } from './starships-routing.module';
import { StarshipInfoComponent } from './starship-info/starship-info.component';
import { StarshipsListComponent } from './starships-list/starships-list.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [

  StarshipInfoComponent,

  StarshipsListComponent],
  imports: [
    CommonModule,
    StarshipsRoutingModule,
    SharedModule
  ]
})
export class StarshipsModule { }
