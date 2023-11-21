import { Injectable } from '@angular/core';
import {Planet} from '../../interfaces/Planet/planet';
import {getHost, getId} from '../../constants/consts';
import {expand, map, reduce, shareReplay} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {PlanetsResponse} from '../../interfaces/Planet/planets-response';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  // @ts-ignore
  private changePlanetSubject = new BehaviorSubject<number>(null);
  private changePlanetId$ = this.changePlanetSubject.asObservable();

  // @ts-ignore
  private changeFilterSubject = new BehaviorSubject<string>(null);
  private changeFilter$ = this.changeFilterSubject.asObservable();

  planets$: Observable<Planet[]> = this.getPlanets();
  planet$: Observable<Planet> = this.getPlanet();

  constructor(private http: HttpClient) { }

  private getPlanet(): Observable<Planet> {
    return combineLatest([
      this.planets$,
      this.changePlanetId$
    ]).pipe(
      // @ts-ignore
      map(([planets, id]) => planets.find(planet => planet.id === id)),
      shareReplay(1)
    );
  }

  private getPlanets(): Observable<Planet[]> {

    return combineLatest([
      this.http.get<PlanetsResponse>(`${getHost()}/planets`).pipe(
        expand(response => response.next ? this.http.get<PlanetsResponse>(response.next) : EMPTY),
        // @ts-ignore
        reduce((acc, current) => acc.concat(current.results), []),
        map(planets => this.mapPlanets(planets))
      ),
      this.changeFilter$
    ]).pipe(
      // @ts-ignore
      map(([planets, changeFilter]) => planets.filter(planet => changeFilter ? planet.name.toLowerCase().includes(changeFilter) : planet)),
      shareReplay(1)
    );
  }

  private mapPlanets(planets: Planet[]): Planet[] {
    return planets.map(planet => {
      planet.filmIds = planet.films.map(url => getId(url));
      planet.id = getId(planet.url);
      planet.residentIds = planet.residents.map(url => getId(url));
      return planet;
    }).sort(this.sortNames);
  }

  private sortNames(a: Planet, b: Planet): number {
    return a.name > b.name
      ? 1
      : a.name < b.name
        ? -1
        : 0;
  }

  changePlanet(id: number): void {
    this.changePlanetSubject.next(id);
  }

  changeFilter(text: string): void {
    this.changeFilterSubject.next(text.toLowerCase());
  }

  getCurrentFilter(): string {
    return this.changeFilterSubject.getValue();
  }
}
