import { useEffect } from "react";
import { loginService, useGetUserQuery } from "./services/authen";

const user = { username: "kminchelle", password: "0lelplR" };
interface IUserResponse {
  token: string
}
function App() {
  const [login, {data}] = loginService<IUserResponse>();
  const {data: userData} = useGetUserQuery<IUserResponse>(user);


  useEffect(() => {
     login(user)
  }, []);

  useEffect(() => {
    console.log('data:', data)
  }, [data])

  return (
    <>
      <h1>Vite + React</h1>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
