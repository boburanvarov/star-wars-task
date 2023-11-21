import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { StarshipsService } from '../../shared/services/Starships/starships.service';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../shared/services/Films/films.service';
import { CharactersService } from '../../shared/services/Characters/characters.service';
import { StarshipsData } from '../../shared/interfaces/Starship/starships-data';

@Component({
  selector: 'app-starship-info',
  templateUrl: './starship-info.component.html',
  styleUrls: ['./starship-info.component.scss']
})
export class StarshipInfoComponent implements OnInit {
  starship$!: Observable<StarshipsData>;

  constructor(
    private charactersService: CharactersService,
    private filmsService: FilmsService,
    private route: ActivatedRoute,
    private starshipsService: StarshipsService
  ) { }

  ngOnInit(): void {
    this.getStarShipsInfo()
  }

  getStarShipsInfo() {
    // @ts-ignore
    this.starship$ = this.route
      .paramMap
      .pipe(
        // @ts-ignore
        tap(params => this.starshipsService.changeStarship(+params.get('id'))),
        switchMap(() => combineLatest([
          this.starshipsService.starship$,
          this.charactersService.characters$,
          this.filmsService.films$
        ]).pipe(
          map(([starship, characters, films]) => {
            return {
              ...starship,
              filmsData: films.filter(film => starship.filmIds.includes(film.id)),
              pilotsData: characters.filter(character => starship.pilotIds.includes(character.id))
            };
          })
        ))
      );
  }

}
