import {Film} from './film';

export interface FilmsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}
