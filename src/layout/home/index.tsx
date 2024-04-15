import { Outlet } from "react-router-dom";
import { useAppDispatch } from "@/app-core/redux-manager/hooks";
import { logout } from "@libs/features/auth/auth.slice";
export const HomeLayout = () => {
  const dispatch = useAppDispatch();

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
