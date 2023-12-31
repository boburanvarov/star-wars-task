import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {Starship} from '../../interfaces/Starship/starship';
import {HttpClient} from '@angular/common/http';
import {expand, map, reduce, shareReplay} from 'rxjs/operators';
import {StarshipsResponse} from '../../interfaces/Starship/starships-response';
import {getHost, getId} from '../../constants/consts';

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {

  // @ts-ignore
  private changeStarshipSubject = new BehaviorSubject<number>(null);
  private changeStarshipId$ = this.changeStarshipSubject.asObservable();

  // @ts-ignore
  private changeFilterSubject = new BehaviorSubject<string>(null);
  private changeFilter$ = this.changeFilterSubject.asObservable();

  starships$: Observable<Starship[]> = this.getStarships();
  starship$: Observable<Starship> = this.getStarship();

  constructor(private http: HttpClient) {
  }

  private getStarship(): Observable<Starship> {

    return combineLatest([
      this.starships$,
      this.changeStarshipId$
    ]).pipe(
      // @ts-ignore
      map(([starships, id]) => starships.find(starship => starship.id === id)),
      shareReplay(1)
    );
  }

  private getStarships(): Observable<Starship[]> {
    return combineLatest([
      this.http.get<StarshipsResponse>(`${getHost()}/starships`).pipe(
        expand(response => response.next ? this.http.get<StarshipsResponse>(response.next) : EMPTY),
        // @ts-ignore
        reduce((acc, current) => acc.concat(current.results), []),
        map(starships => this.mapStarships(starships))
      ),
      this.changeFilter$
    ]).pipe(
      // tslint:disable-next-line:max-line-length
      map(([starships, changeFilter]) => starships.filter(starship => changeFilter ? starship.name.toLowerCase().includes(changeFilter) : starship)),
      shareReplay(1)
    );
  }

  private mapStarships(starships: Starship[]): Starship[] {
    return starships.map(starship => {
      starship.pilotIds = starship.pilots.map(url => getId(url));
      starship.filmIds = starship.films.map(url => getId(url));
      starship.id = getId(starship.url);
      return starship;
    }).sort(this.sortNames);
  }

  private sortNames(a: Starship, b: Starship): number {
    return a.name > b.name
      ? 1
      : a.name < b.name
        ? -1
        : 0;
  }

  changeStarship(id: number): void {
    this.changeStarshipSubject.next(id);
  }

  changeFilter(text: string): void {
    this.changeFilterSubject.next(text.toLowerCase());
  }

  getCurrentFilter(): string {
    return this.changeFilterSubject.getValue();
  }
}
