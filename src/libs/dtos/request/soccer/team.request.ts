export interface ISearchTeamRequest {
  // The id of the player
  id?: number;
  // The id of the team
  name?: number;
  // The id of the league
  league?: number;
  // The name of the country
  country?: string;
  // The season of the league (4 characters) : YYYY
  season?: number;
  // The code of player
  code?: string;
  // The venue of player
  venue?: number;
  // The name of player
  search?: string;
}
