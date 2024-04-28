import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from "@constant/navigation.constant";
import type { NavigationTree } from "@app-core/@types/navigation";
import { HiChartBar, HiUser } from "react-icons/hi";

const navigationConfig: NavigationTree[] = [
    {
        key: "Apps",
        path: "",
        title: "Apps",
        translateKey: "Apps",
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: "dashboard",
                path: "dashboard",
                title: "Dashboard",
                translateKey: "",
                icon: <HiChartBar />,
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: "user",
                path: "",
                title: "User Management",
                translateKey: "",
                icon: <HiUser />,
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: "user/user-list",
                        path: "user/user-list",
                        title: "User List",
                        translateKey: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: "user/permission",
                        path: "user/permission",
                        title: "Permission",
                        translateKey: "",
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ],
            },
        ],
    },
];

export default navigationConfig;
