import { useEffect } from "react";
import {  useGetUserQuery, useLoginMutation, ILoginResponse, IUserResponse } from "./services/authen";
const user = { username: "kminchelle", password: "0lelplR" };

function App() {
  const [login, {data: loginData}] = useLoginMutation<ILoginResponse>();  
  
  const { data: userData } = useGetUserQuery<IUserResponse>(user);

  useEffect(() => {
     login(user)
  }, [login]);

  useEffect(() => {
    console.log('data:', userData)
    console.log('loginData:', loginData)
  }, [loginData, userData])

  return (
    <>
      <h1>Vite + React</h1>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
