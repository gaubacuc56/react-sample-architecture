import { Outlet } from "react-router-dom";
import Card from "@libs/components/Card";
import SidePanel from "@libs/components/SidePanel";

export const AuthLayout = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
            <SidePanel hoverable={false} />
            <Card className="flex flex-col items-center justify-center dark:!bg-slate-800 md:p-10 min-w-[320px] md:min-w-[450px]">
                <div className="w-full">
                    <Outlet />
                </div>
            </Card>
        </div>
    );
};
