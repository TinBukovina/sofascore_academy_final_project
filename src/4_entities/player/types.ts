import { CountryInterface } from "../event";
import { TeamInterface } from "../team";

export interface PlayerInterface {
  id: number;
  country: CountryInterface;
  name: string;
  position: string;
  slug: string;
  team: TeamInterface;
}
