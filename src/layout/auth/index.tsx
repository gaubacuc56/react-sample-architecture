import { Outlet } from "react-router-dom";
import Card from "@libs/components/ui/Card";
import SidePanel from "@libs/components/template/SidePanel";
import { useTheme } from "@libs/hooks/useTheme";

export const AuthLayout = () => {
    const { themeColor, primaryColorLevel } = useTheme();

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900">
            <SidePanel
                hoverable={false}
                className={`fixed right-0 top-5 md:top-auto p-3 rounded-none rounded-tl-lg rounded-bl-lg text-white text-xl cursor-pointer select-none bg-${themeColor}-${primaryColorLevel}`}
            />
            <Card className="flex flex-col items-center justify-center dark:!bg-slate-800 p-7 md:p-10  min-w-[350px] md:min-w-[450px]">
                <div className="w-full">
                    <Outlet />
                </div>
            </Card>
        </div>
    );
};
