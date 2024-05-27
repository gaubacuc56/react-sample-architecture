export interface ISearchLeagueRequest {
	// The id of the league
	id?: number;
	// The name  of the league
	name?: string;
	// The country of the league
	country?: string;
	// The Alpha2 code of the country ( 2 characters ): FR, GB
	code?: string;
	// The season of the league (4 characters) : YYYY
	season?: number;
	// The id of the team
	team?: number;
	// The type of the league
	type?: "league" | "cup";
	// The state of the league
	// Return the list of active seasons or the last one of each competition.
	current?: boolean;
	// The name or the country of the league
	search?: string;
	// The X last leagues/cups added in the API ( <= 2 characters )
	last?: number;
}
