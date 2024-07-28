export interface ILoginResponse {
  token: string
  refreshToken: string;
}
export interface IGetUserResponse {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
}