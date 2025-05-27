export interface ScoreInterface {
  total: number;
  period1: number;
  period2: number;
}

export interface TeamInterface {
  id: number;
  name: string;
  country: CountryInterface;
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

export interface TournomentInterface {
  id: number;
  name: string;
  slug: string;
  sport: SportInterface;
  country: CountryInterface;
}

export interface EventInterface {
  id: number;
  slug: string;
  tournoment: TournomentInterface;
  homeTeam: TeamInterface;
  awayTeam: TeamInterface;
  status: string;
  startDate: Date;
  homeScore: ScoreInterface;
  awayScore: ScoreInterface;
  winnerCode: string;
  round: number;
}
