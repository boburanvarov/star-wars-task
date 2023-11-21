import { Component, OnInit } from '@angular/core';
import {SpeciesService} from "../../shared/services/Species/species.service";
import {Observable} from "rxjs";
import {Specie} from "../../shared/interfaces/Specie/specie";

@Component({
  selector: 'app-species-lists',
  templateUrl: './species-lists.component.html',
  styleUrls: ['./species-lists.component.scss']
})
export class SpeciesListsComponent implements OnInit {

  species$!: Observable<Specie[]>;

  get currentFilter(): string {
    return this.speciesService.getCurrentFilter();
  }

  constructor(private speciesService: SpeciesService) { }

  ngOnInit(): void {
      this.getSpecies()
  }

  getSpecies(){
    this.species$ = this.speciesService.species$;
  }

  onInput(text: string): void {
    this.speciesService.changeFilter(text);
  }

}
