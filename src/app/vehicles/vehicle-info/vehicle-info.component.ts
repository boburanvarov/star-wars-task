import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { VehicleData } from '../../shared/interfaces/Vehicle/vehicle-data';
import { CharactersService } from '../../shared/services/Characters/characters.service';
import { VehiclesService } from '../../shared/services/Vehicles/vehicles.service';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../shared/services/Films/films.service';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.scss']
})
export class VehicleInfoComponent implements OnInit {

  vehicle$!: Observable<VehicleData>;

  constructor(
    private charactersService: CharactersService,
    private filmsService: FilmsService,
    private vehiclesService: VehiclesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getVehicleInfo()
  }

  getVehicleInfo() {
    // @ts-ignore
    this.vehicle$ = this.route
      .paramMap
      .pipe(
        // @ts-ignore
        tap(params => this.vehiclesService.changeVehicle(+params.get('id'))),
        switchMap(() => combineLatest([
          this.vehiclesService.vehicle$,
          this.charactersService.characters$,
          this.filmsService.films$
        ]).pipe(
          map(([vehicle, characters, films]) => {
            return {
              ...vehicle,
              filmsData: films.filter(film => vehicle.filmIds.includes(film.id)),
              pilotsData: characters.filter(character => vehicle.pilotIds.includes(character.id))
            };
          })
        ))
      );
  }

}
