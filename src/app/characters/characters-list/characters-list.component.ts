import { Component, OnInit } from '@angular/core';
import {CharactersService} from '../../shared/services/Characters/characters.service';
import {Observable} from 'rxjs';
import {Character} from '../../shared/interfaces/Character/character';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  characters$!: Observable<Character[]>;

  get currentFilter(): string {
    return this.charactersService.getCurrentFilter();
  }

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
      this.getCharacter()
  }

  getCharacter(){
    this.characters$ = this.charactersService.characters$;
  }

  onInput(text: string): void {
    this.charactersService.changeFilter(text);
  }
}
