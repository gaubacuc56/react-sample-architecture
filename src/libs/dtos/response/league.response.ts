interface League {
	id: number;
	name: string;
	type: string;
	logo: string;
}

interface Country {
	name: string;
	code: string | null;
	flag: string | null;
}

interface Coverage {
	fixtures: {
		events: boolean;
		lineups: boolean;
		statistics_fixtures: boolean;
		statistics_players: boolean;
	};
	standings: boolean;
	players: boolean;
	top_scorers: boolean;
	top_assists: boolean;
	top_cards: boolean;
	injuries: boolean;
	predictions: boolean;
	odds: boolean;
}

interface Season {
	year: number;
	start: string;
	end: string;
	current: boolean;
	coverage: Coverage;
}

export interface ISearchLeagueResponse {
	league: League;
	country: Country;
	seasons: Season[];
}
