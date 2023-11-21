import {Injectable} from '@angular/core';
import {Character} from '../../interfaces/Character/character';
import {getHost, getId} from '../../constants/consts';
import {CharactersResponse} from '../../interfaces/Character/characters-response';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {expand, map, reduce, shareReplay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  // @ts-ignore
  private changeCharacterSubject = new BehaviorSubject<number>(null);
  private changeCharacterId$ = this.changeCharacterSubject.asObservable();

  // @ts-ignore
  private changeFilterSubject = new BehaviorSubject<string>(null);
  private changeFilter$ = this.changeFilterSubject.asObservable();

  characters$: Observable<Character[]> = this.getCharacters();
  character$: Observable<Character> = this.getCharacter();

  constructor(private http: HttpClient) {
  }

  private getCharacter(): Observable<Character> {

    return combineLatest([
      this.characters$,
      this.changeCharacterId$
    ]).pipe(
      // @ts-ignore
      map(([characters, id]) => characters.find(character => character.id === id)),
      shareReplay(1)
    );
  }

  private getCharacters(): Observable<Character[]> {

    return combineLatest([
      this.http.get<CharactersResponse>(`${getHost()}/people`).pipe(
        expand(response => response.next ? this.http.get<CharactersResponse>(response.next) : EMPTY),
        // @ts-ignore
        reduce((acc, current) => acc.concat(current.results), []),
        map(characters => this.mapCharacters(characters))
      ),
      this.changeFilter$
    ]).pipe(
      // tslint:disable-next-line:max-line-length
      map(([characters, changeFilter]) => characters.filter(character => changeFilter ? character.name.toLowerCase().includes(changeFilter) : character)),
      shareReplay(1)
    );
  }

  private mapCharacters(characters: Character[]): Character[] {
    return characters.map(character => {
      character.filmIds = character.films.map(url => getId(url));
      character.homeworldId = getId(character.homeworld);
      character.id = getId(character.url);
      character.speciesIds = character.species.map(url => getId(url));
      character.starshipIds = character.starships.map(url => getId(url));
      character.vehicleIds = character.vehicles.map(url => getId(url));
      return character;
    }).sort(this.sortNames);
  }

  private sortNames(a: Character, b: Character): number {
    return a.name > b.name
      ? 1
      : a.name < b.name
        ? -1
        : 0;
  }

  changeCharacter(id: number): void {
    this.changeCharacterSubject.next(id);
  }

  changeFilter(text: string): void {
    this.changeFilterSubject.next(text.toLowerCase());
  }

  getCurrentFilter(): string {
    return this.changeFilterSubject.getValue();
  }

}
