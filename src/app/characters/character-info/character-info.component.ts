import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {CharactersService} from '../../shared/services/Characters/characters.service';
import {VehiclesService} from '../../shared/services/Vehicles/vehicles.service';
import {PlanetsService} from '../../shared/services/Planets/planets.service';

import {CharacterData} from '../../shared/interfaces/Character/character-data';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss']
})
export class CharacterInfoComponent implements OnInit {

  character$!: Observable<CharacterData>;

  constructor(
    private charactersService: CharactersService,
    private planetsService: PlanetsService,
    private route: ActivatedRoute,
    private vehiclesService: VehiclesService
  ) {
  }

  ngOnInit(): void {
    this.getCharacterInfo()
  }

  getCharacterInfo(){
   // @ts-ignore
   this.character$ = this.route
   .paramMap
   .pipe(
     // @ts-ignore
     tap(params => this.charactersService.changeCharacter(+params.get('id'))),
     switchMap(() => combineLatest([
       this.charactersService.character$,
       this.planetsService.planets$,
       this.vehiclesService.vehicles$
     ]).pipe(
       map(([character, planets, vehicles]) => {
         return {
           ...character,
           homeworldData: planets.find(planet => character.homeworldId === planet.id),
           vehiclesData: vehicles.filter(vehicle => character.vehicleIds.includes(vehicle.id))
         }
       })
     ))
   );
  }


}
