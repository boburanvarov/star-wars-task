import {Character} from '../Character/character';
import {Film} from '../Film/film';
import {Starship} from './starship';

export interface StarshipsData extends Starship {
  filmsData: Film[];
  pilotsData: Character[];
}
