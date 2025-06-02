import { PlayerInterface } from "../player";
import { TeamInterface } from "../team";
import { TournamentInterface } from "../tournament";

export interface ScoreInterface {
  total: number;
  period1: number;
  period2: number;
}

export interface CountryInterface {
  id: number;
  name: string;
}

export interface SportInterface {
  id: number;
  name: string;
  slug: string;
}

export interface EventInterface {
  id: number;
  slug: string;
  tournament: TournamentInterface;
  homeTeam: TeamInterface;
  awayTeam: TeamInterface;
  status: string;
  startDate: Date;
  homeScore: ScoreInterface;
  awayScore: ScoreInterface;
  winnerCode: string;
  round: number;
}

export interface IncidentsInterface {
  player: PlayerInterface;
  teamSide?: "home" | "away";
  scoringTeam?: "home" | "away";
  color: "yellow" | "yellowred" | "red";
  id: number;
  time: number;
  type: "card" | "goal" | "period";
  text?: string;
}
