import {Specie} from './specie';

export interface SpeciesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Specie[];
}
