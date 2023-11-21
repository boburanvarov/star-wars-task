import {Vehicle} from './vehicle';

export interface VehiclesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Vehicle[];
}
