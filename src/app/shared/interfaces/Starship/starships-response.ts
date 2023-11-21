import {Starship} from './starship';

export interface StarshipsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
}
