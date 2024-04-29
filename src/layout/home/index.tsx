import { Outlet } from "react-router-dom";
import SideNav from "@libs/components/template/SideNav";
import Header from "@libs/components/template/Header";
import SidePanel from "@libs/components/template/SidePanel";
import UserDropdown from "@libs/components/template/UserDropdown";
import MobileNav from "@libs/components/template/MobileNav";
import SideNavToggle from "@libs/components/template/SideNavToggle";
import Breadcrumbs from "@libs/components/ui/BreadCrumbs";

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
        <div className="app-layout-modern flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                <SideNav />
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
                    <Header
                        className="border-b border-gray-200 dark:border-gray-700"
                        headerEnd={<HeaderActionsEnd />}
                        headerStart={<HeaderActionsStart />}
                    />
                    <div className="page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6">
                        <Breadcrumbs />
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
