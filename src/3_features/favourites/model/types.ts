import { EventInterface, TournomentInterface } from "@/4_entities/event";
import { PlayerInterface } from "@/4_entities/player";
import { TeamInterface } from "@/4_entities/team";

export interface FavouritesContextType {
  favouriteEvents: EventInterface[];
  favouriteTeams: TeamInterface[];
  favouriteTournoments: TournomentInterface[];
  favouritePlayers: PlayerInterface[];
  addEventToFavourites: (item: EventInterface) => void;
  removeEventFromFavourites: (itemId: number) => void;
  addTeamToFavourites: (item: TeamInterface) => void;
  removeTeamFromFavourites: (itemId: number) => void;
  addTournomentToFavourites: (item: TournomentInterface) => void;
  removeTournomentFromFavourites: (itemId: number) => void;
  addPlayerToFavourites: (item: PlayerInterface) => void;
  removePlayerFromFavourites: (itemId: number) => void;
  isEventAlreadyFavourite: (itemId: number) => boolean;
  isTeamAlreadyFavourite: (itemId: number) => boolean;
  isTournomentAlreadyFavourite: (itemId: number) => boolean;
  isPlayerAlreadyFavourite: (itemId: number) => boolean;
}
