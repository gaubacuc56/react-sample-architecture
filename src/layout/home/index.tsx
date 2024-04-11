import { Outlet } from "react-router-dom";
export const HomeLayout = () => {

  return (
    <div>
      <h1>Home Layout</h1>
      <Outlet />
    </div>
  );
};
