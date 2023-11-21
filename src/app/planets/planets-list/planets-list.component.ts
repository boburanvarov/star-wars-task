import { Component, OnInit } from '@angular/core';
import {PlanetsService} from '../../shared/services/Planets/planets.service';
import {Observable} from 'rxjs';
import {Planet} from '../../shared/interfaces/Planet/planet';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {

  planets$!: Observable<Planet[]>;

  get currentFilter(): string {
    return this.planetsService.getCurrentFilter();
  }

  constructor(private planetsService: PlanetsService) { }

  ngOnInit(): void {
   this.getPlanets()
  }

  getPlanets(){
    this.planets$ = this.planetsService.planets$;
  }

  onInput(text: string): void {
    this.planetsService.changeFilter(text);
  }
}
