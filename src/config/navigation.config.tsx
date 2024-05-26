import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from "@constant/navigation.constant";
import type { NavigationTree } from "@app-core/@types/navigation";
import { BiCategoryAlt, BiBarChart } from "react-icons/bi";

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
                icon: <BiBarChart />,
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: "league",
                path: "",
                title: "Leagues",
                translateKey: "",
                icon: <BiCategoryAlt />,
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: "league/league-list",
                        path: "league/league-list",
                        title: "League List",
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
