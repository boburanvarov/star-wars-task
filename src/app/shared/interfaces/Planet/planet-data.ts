import {Character} from '../Character/character';
import {Film} from '../Film/film';
import {Planet} from './planet';

export interface PlanetData extends Planet {
  filmsData: Film[];
  residentsData: Character[];
}
