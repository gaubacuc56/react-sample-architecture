import { Outlet } from "react-router-dom";
import SideNav from "@libs/components/template/SideNav";
import Header from "@libs/components/template/Header";
import SidePanel from "@libs/components/template/SidePanel";
import UserDropdown from "@libs/components/template/UserDropdown";
import MobileNav from "@libs/components/template/MobileNav";
import SideNavToggle from "@libs/components/template/SideNavToggle";

const HeaderActionsStart = () => {
    return (
        <>
            <MobileNav />
            <SideNavToggle />
        </>
    );
};

const HeaderActionsEnd = () => {
    return (
        <>
            <SidePanel className="text-2xl" hoverable />
            <UserDropdown hoverable={false} />
        </>
    );
};

export const HomeLayout = () => {
    return (
        <div className="app-layout-classic flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                <SideNav />
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow dark:shadow-2xl"
                        headerStart={<HeaderActionsStart />}
                        headerEnd={<HeaderActionsEnd />}
                    />
                    <div className="h-full flex flex-auto flex-col">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
