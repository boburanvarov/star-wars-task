import { Component, OnInit } from '@angular/core';
import { VehiclesService } from "../../shared/services/Vehicles/vehicles.service";
import { Observable } from "rxjs";
import { Vehicle } from "../../shared/interfaces/Vehicle/vehicle";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {

  vehicles$!: Observable<Vehicle[]>;

  get currentFilter(): string {
    return this.vehiclesService.getCurrentFilter();
  }

  constructor(private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this.getVehicles()
  }

  getVehicles() {
    this.vehicles$ = this.vehiclesService.vehicles$;
  }

  onInput(text: string): void {
    this.vehiclesService.changeFilter(text);
  }

}
