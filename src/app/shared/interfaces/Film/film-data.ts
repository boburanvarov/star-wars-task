import {Vehicle} from '../Vehicle/vehicle';
import {Starship} from '../Starship/starship';
import {Specie} from '../Specie/specie';
import {Planet} from '../Planet/planet';
import {Character} from '../Character/character';
import {Film} from "./film";

export interface FilmData extends Film {
  charactersData: Character[];
  planetsData: Planet[];
  speciesData: Specie[];
  starshipsData: Starship[];
  vehiclesData: Vehicle[];
}
