import { useEffect } from "react";
import { useLoginMutation } from "./features/auth/auth.service";
function App() {
  const [login, {data: loginData}] = useLoginMutation();  
  
  useEffect(() => {
     login({username: '', password: ''})
  }, [login]);

  useEffect(() => {
    console.log('loginData:', loginData)
  }, [loginData])

  return (
    <>
      <h1>Vite + React</h1>
      <p>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
