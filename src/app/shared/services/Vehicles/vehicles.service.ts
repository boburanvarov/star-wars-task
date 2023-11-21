import {Injectable} from '@angular/core';
import {Vehicle} from '../../interfaces/Vehicle/vehicle';
import {BehaviorSubject, combineLatest, EMPTY, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {expand, map, reduce, shareReplay} from 'rxjs/operators';
import {VehiclesResponse} from '../../interfaces/Vehicle/vehicles-response';
import {getHost, getId} from '../../constants/consts';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  // @ts-ignore
  private changeVehicleSubject = new BehaviorSubject<number>(null);
  private changeVehicleId$ = this.changeVehicleSubject.asObservable();

  // @ts-ignore
  private changeFilterSubject = new BehaviorSubject<string>(null);
  private changeFilter$ = this.changeFilterSubject.asObservable();

  vehicles$: Observable<Vehicle[]> = this.getVehicles();
  vehicle$: Observable<Vehicle> = this.getVehicle();

  constructor(private http: HttpClient) {
  }

  private getVehicle(): Observable<Vehicle> {

    return combineLatest([
      this.vehicles$,
      this.changeVehicleId$
    ]).pipe(
      // @ts-ignore
      map(([vehicles, id]) => vehicles.find(vehicle => vehicle.id === id)),
      shareReplay(1)
    );
  }

  private getVehicles(): Observable<Vehicle[]> {

    return combineLatest([
      this.http.get<VehiclesResponse>(`${getHost()}/vehicles`).pipe(
        expand(response => response.next ? this.http.get<VehiclesResponse>(response.next) : EMPTY),
        // @ts-ignore
        reduce((acc, current) => acc.concat(current.results), []),
        map(vehicles => this.mapVehicles(vehicles))
      ),
      this.changeFilter$
    ]).pipe(
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      map(([vehicles, changeFilter]) => vehicles.filter(vehicle => changeFilter ? vehicle.name.toLowerCase().includes(changeFilter) : vehicle)),
      shareReplay(1)
    );
  }

  private mapVehicles(vehicles: Vehicle[]): Vehicle[] {
    return vehicles.map(vehicle => {
      vehicle.pilotIds = vehicle.pilots.map(url => getId(url));
      vehicle.filmIds = vehicle.films.map(url => getId(url));
      vehicle.id = getId(vehicle.url);
      return vehicle;
    }).sort(this.sortNames);
  }

  private sortNames(a: Vehicle, b: Vehicle): number {
    return a.name > b.name
      ? 1
      : a.name < b.name
        ? -1
        : 0;
  }

  changeVehicle(id: number): void {
    this.changeVehicleSubject.next(id);
  }

  changeFilter(text: string): void {
    this.changeFilterSubject.next(text.toLowerCase());
  }

  getCurrentFilter(): string {
    return this.changeFilterSubject.getValue();
  }
}
