import {Character} from '../Character/character';
import {Planet} from '../Planet/planet';
import {Film} from '../Film/film';
import {Specie} from './specie';

export interface SpeciesData extends Specie {
  filmsData: Film[];
  homeworldData: Planet;
  peopleData: Character[];
}
