import { CountryInterface, ScoreInterface, SportInterface } from "../event";
import { TeamInterface } from "../team";

export interface StandingRowInterface {
  id: number;
  team: TeamInterface;
  points: number | null;
  scoresFor: number;
  scoresAgainst: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  percentage: number | null;
}

export interface TournamentInterface {
  id: number;
  name: string;
  slug: string;
  sport: SportInterface;
  country: CountryInterface;
}

export interface TournamentStandingsInterface {
  id: number;
  tournoment: TournamentInterface;
  type: "total" | "home" | "away";
  sortedStandingsRows: StandingRowInterface[];
}

export interface TournamentEventsInterface {
  id: number;
  slug: string;
  tournament: TournamentInterface;
  homeTeam: TeamInterface;
  awayTeam: TeamInterface;
  status: "notstarted" | "inprogress" | "finished";
  startDate: Date;
  homeScore: ScoreInterface;
  awayScore: ScoreInterface;
  winnerCode: string;
  round: number;
}
