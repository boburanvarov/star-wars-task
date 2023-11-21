import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [

  VehicleInfoComponent,

  VehiclesListComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    SharedModule
  ]
})
export class VehiclesModule { }
