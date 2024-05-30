interface Player {
	id: number;
	name: string;
	firstname: string;
	lastname: string;
	age: number;
	birth: {
		date: string;
		place: string;
		country: string;
	};
	nationality: string;
	height: string;
	weight: string;
	injured: boolean;
	photo: string;
}

interface Team {
	id: number;
	name: string;
	logo: string;
}

interface League {
	id: number;
	name: string;
	country: string;
	logo: string;
	flag: string | null;
	season: number;
}

interface Games {
	appearences: number;
	lineups: number;
	minutes: number;
	number: number | null;
	position: string;
	rating: string | null;
	captain: boolean;
}

interface Substitutes {
	in: number;
	out: number;
	bench: number;
}

interface Shots {
	total: number | null;
	on: number | null;
}

interface Goals {
	total: number;
	conceded: number | null;
	assists: number | null;
	saves: number | null;
}

interface Passes {
	total: number | null;
	key: number | null;
	accuracy: number | null;
}

interface Tackles {
	total: number | null;
	blocks: number | null;
	interceptions: number | null;
}

interface Duels {
	total: number | null;
	won: number | null;
}

interface Dribbles {
	attempts: number | null;
	success: number | null;
	past: number | null;
}

interface Fouls {
	drawn: number | null;
	committed: number | null;
}

interface Cards {
	yellow: number;
	yellowred: number;
	red: number;
}

interface Penalty {
	won: number | null;
	commited: number | null;
	scored: number | null;
	missed: number | null;
	saved: number | null;
}

interface Statistics {
	team: Team;
	league: League;
	games: Games;
	substitutes: Substitutes;
	shots: Shots;
	goals: Goals;
	passes: Passes;
	tackles: Tackles;
	duels: Duels;
	dribbles: Dribbles;
	fouls: Fouls;
	cards: Cards;
	penalty: Penalty;
}

export interface ISearchPlayerResponse {
	player: Player;
	statistics: Statistics[];
}
