import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehiclesListComponent} from './vehicles-list/vehicles-list.component';
import {VehicleInfoComponent} from './vehicle-info/vehicle-info.component';


const routes: Routes = [
  {
    path: '',
    component: VehiclesListComponent
  },
  {
    path: ':id',
    component: VehicleInfoComponent,
    data: {
      pageTitle: 'View Vehicle'
    }
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
