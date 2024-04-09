import { Outlet } from "react-router-dom";
export const ErrorLayout = () => {
  return (
    <div>
      <h1>Error Layout</h1>
      <Outlet />
    </div>
  );
};