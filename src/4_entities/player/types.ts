import { CountryInterface } from "../event";

export interface PlayerInterface {
  id: number;
  country: CountryInterface;
  name: string;
  position: string;
  slug: string;
}
