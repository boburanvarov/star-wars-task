import {Vehicle} from "../Vehicle/vehicle";
import {Planet} from "../Planet/planet";
import {Character} from "./character";

export interface CharacterData extends Character {
  homeworldData: Planet;
  vehiclesData: Vehicle[];
}
