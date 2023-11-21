import {Character} from '../Character/character';
import {Film} from '../Film/film';
import {Vehicle} from './vehicle';

export interface VehicleData extends Vehicle {
  filmsData: Film[];
  pilotsData: Character[];
}
