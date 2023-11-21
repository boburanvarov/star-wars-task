import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { SpeciesService } from '../../shared/services/Species/species.service';
import { ActivatedRoute } from '@angular/router';
import { PlanetsService } from '../../shared/services/Planets/planets.service';
import { FilmsService } from '../../shared/services/Films/films.service';
import { CharactersService } from '../../shared/services/Characters/characters.service';
import { SpeciesData } from '../../shared/interfaces/Specie/species-data';

@Component({
  selector: 'app-specie-info',
  templateUrl: './specie-info.component.html',
  styleUrls: ['./specie-info.component.scss']
})
export class SpecieInfoComponent implements OnInit {
  specie$!: Observable<SpeciesData>;

  constructor(
    private charactersService: CharactersService,
    private filmsService: FilmsService,
    private planetsService: PlanetsService,
    private route: ActivatedRoute,
    private speciesService: SpeciesService
  ) {
  }

  ngOnInit(): void {
    this.getSpeciesInfo()
  }

  getSpeciesInfo() {
    // @ts-ignore
    this.specie$ = this.route
      .paramMap
      .pipe(
        // @ts-ignore
        tap(params => this.speciesService.changeSpecie(+params.get('id'))),
        switchMap(() => combineLatest([
          this.speciesService.specie$,
          this.charactersService.characters$,
          this.filmsService.films$,
          this.planetsService.planets$
        ]).pipe(
          map(([specie, characters, films, planets]) => {
            return {
              ...specie,
              filmsData: films.filter(film => specie.filmIds.includes(film.id)),
              peopleData: characters.filter(character => specie.peopleIds.includes(character.id)),
              homeworldData: planets.find(planet => specie.homeworldId === planet.id)
            };
          })
        ))
      );
  }

}
