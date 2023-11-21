import { Component, OnInit } from '@angular/core';
import {map, switchMap, tap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {CharactersService} from '../../shared/services/Characters/characters.service';
import {FilmsService} from '../../shared/services/Films/films.service';
import {PlanetsService} from '../../shared/services/Planets/planets.service';
import {ActivatedRoute} from '@angular/router';
import {SpeciesService} from '../../shared/services/Species/species.service';
import {StarshipsService} from '../../shared/services/Starships/starships.service';
import {VehiclesService} from '../../shared/services/Vehicles/vehicles.service';
import {FilmData} from '../../shared/interfaces/Film/film-data';

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.scss']
})
export class FilmInfoComponent implements OnInit {

  film$!: Observable<FilmData>;

  constructor(
    private charactersService: CharactersService,
    private filmsService: FilmsService,
    private planetsService: PlanetsService,
    private route: ActivatedRoute,
    private speciesService: SpeciesService,
    private starshipsService: StarshipsService,
    private vehiclesService: VehiclesService
  ) { }

  ngOnInit(): void {
      this.getFilmsInfo()
  }

  getFilmsInfo(){
    this.film$ = this.route
      .paramMap
      .pipe(
        // @ts-ignore
        tap(params => this.filmsService.changeFilm(+params.get('id'))),
        switchMap(() => combineLatest([
          this.filmsService.film$,
          this.charactersService.characters$,
          this.planetsService.planets$,
          this.speciesService.species$,
          this.starshipsService.starships$,
          this.vehiclesService.vehicles$
        ]).pipe(
          map(([film, characters, planets, species, starships, vehicles]) => {
            return {
              ...film,
              charactersData: characters.filter(character => film.characterIds.includes(character.id)),
              planetsData: planets.filter(planet => film.planetIds.includes(planet.id)),
              speciesData: species.filter(specie => film.speciesIds.includes(specie.id)),
              starshipsData: starships.filter(starship => film.starshipIds.includes(starship.id)),
              vehiclesData: vehicles.filter(vehicle => film.vehicleIds.includes(vehicle.id))
            };
          })
        ))
      );
  }

}
