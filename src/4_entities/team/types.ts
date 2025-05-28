import { CountryInterface } from "../event";

export interface TeamInterface {
  id: number;
  name: string;
  country: CountryInterface;
}

export interface TeamWithImageInterface extends TeamInterface {
  image: string;
}
