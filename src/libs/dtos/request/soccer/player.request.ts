export interface ISearchPlayerRequest {
	// The id of the player
	id?: number;
	// The id  of the team
	team?: number;
	// The id  of the league
	league?: number;
	// The season of the league (4 characters) : YYYY
	season?: number;
	// The name of player
	search?: string;
	// Use for the pagination
	page: number;
}
