import { EventInterface } from "@/4_entities/event";
import { PlayerInterface } from "@/4_entities/player";
import { TeamInterface } from "@/4_entities/team";
import { TournamentInterface } from "@/4_entities/tournament";

export interface FavouritesContextType {
  favouriteEvents: EventInterface[];
  favouriteTeams: TeamInterface[];
  favouriteTournaments: TournamentInterface[];
  favouritePlayers: PlayerInterface[];
  addEventToFavourites: (item: EventInterface) => void;
  removeEventFromFavourites: (itemId: number) => void;
  addTeamToFavourites: (item: TeamInterface) => void;
  removeTeamFromFavourites: (itemId: number) => void;
  addTournomentToFavourites: (item: TournamentInterface) => void;
  removeTournomentFromFavourites: (itemId: number) => void;
  addPlayerToFavourites: (item: PlayerInterface) => void;
  removePlayerFromFavourites: (itemId: number) => void;
  isEventAlreadyFavourite: (itemId: number) => boolean;
  isTeamAlreadyFavourite: (itemId: number) => boolean;
  isTournomentAlreadyFavourite: (itemId: number) => boolean;
  isPlayerAlreadyFavourite: (itemId: number) => boolean;
}
