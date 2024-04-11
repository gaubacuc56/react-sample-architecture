import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@libs/features/auth/auth.slice";
export const HomeLayout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h1>Home Layout</h1>
      <button onClick={handleLogout}>Logout</button>
      <Outlet />
    </div>
  );
};
