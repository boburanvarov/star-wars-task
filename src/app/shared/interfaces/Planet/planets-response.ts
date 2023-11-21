import {Planet} from './planet';

export interface PlanetsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}
