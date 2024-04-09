import { Outlet } from "react-router-dom";
import Card from "@libs/components/Card";
export const AuthLayout = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-900">
      <Card className="flex flex-col items-center justify-center !bg-slate-700 md:p-10">
        <Outlet />
      </Card>
    </div>
  );
};
