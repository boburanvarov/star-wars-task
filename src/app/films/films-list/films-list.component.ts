import { Component, OnInit } from '@angular/core';
import {FilmsService} from "../../shared/services/Films/films.service";
import {Observable} from "rxjs";
import {Film} from "../../shared/interfaces/Film/film";

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {
  films$!: Observable<Film[]>;

  get currentFilter(): string {
    return this.filmsService.getCurrentFilter();
  }

  constructor(private filmsService: FilmsService) { }

  ngOnInit(): void {
    this.getFilms()
  }

  getFilms(){
    this.films$ = this.filmsService.films$;
  }

  onInput(text: string): void {
    this.filmsService.changeFilter(text);
  }

}
