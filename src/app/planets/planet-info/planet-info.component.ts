import { Component, OnInit } from '@angular/core';
import {CharactersService} from '../../shared/services/Characters/characters.service';
import {FilmsService} from '../../shared/services/Films/films.service';
import {PlanetsService} from '../../shared/services/Planets/planets.service';
import {ActivatedRoute} from '@angular/router';
import {PlanetData} from '../../shared/interfaces/Planet/planet-data';
import {combineLatest, Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})
export class PlanetInfoComponent implements OnInit {

  planet$!: Observable<PlanetData>;

  constructor(
    private charactersService: CharactersService,
    private filmsService: FilmsService,
    private planetsService: PlanetsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPlanetsInfo()
  }

  getPlanetsInfo(){
    this.planet$ = this.route
    .paramMap
    .pipe(
      // @ts-ignore
      tap(params => this.planetsService.changePlanet(+params.get('id'))),
      switchMap(() => combineLatest([
        this.planetsService.planet$,
        this.charactersService.characters$,
        this.filmsService.films$
      ]).pipe(
        map(([planet, characters, films]) => {
          return {
            ...planet,
            filmsData: films.filter(film => planet.filmIds.includes(film.id)),
            residentsData: characters.filter(character => planet.residentIds.includes(character.id))
          };
        })
      ))
    );
  }

}
