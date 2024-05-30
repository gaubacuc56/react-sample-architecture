import {
	NAV_ITEM_TYPE_TITLE,
	NAV_ITEM_TYPE_ITEM,
	NAV_ITEM_TYPE_COLLAPSE,
} from "@constant/navigation.constant";
import type { NavigationTree } from "@app-core/@types/navigation";
import { BiBarChart } from "react-icons/bi";
import { FaBasketballBall, FaHockeyPuck } from "react-icons/fa";
import { IoBaseballOutline } from "react-icons/io5";
import { GiSoccerBall } from "react-icons/gi";

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
				key: "footbal",
				path: "",
				title: "Football",
				translateKey: "",
				icon: <GiSoccerBall />,
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [],
				subMenu: [
					{
						key: "football/league-list",
						path: "football/league-list",
						title: "Leagues",
						translateKey: "",
						type: NAV_ITEM_TYPE_ITEM,
						authority: [],
						subMenu: [],
					},
					{
						key: "football/player-list",
						path: "football/player-list",
						title: "Players",
						translateKey: "",
						type: NAV_ITEM_TYPE_ITEM,
						authority: [],
						subMenu: [],
					},
				],
			},
			{
				key: "basketball",
				path: "",
				title: "Basketball",
				translateKey: "",
				icon: <FaBasketballBall />,
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [],
				subMenu: [],
			},
			{
				key: "baseball",
				path: "",
				title: "Baseball",
				translateKey: "",
				icon: <IoBaseballOutline />,
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [],
				subMenu: [],
			},
			{
				key: "hockey",
				path: "",
				title: "Hockey",
				translateKey: "",
				icon: <FaHockeyPuck />,
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [],
				subMenu: [],
			},
		],
	},
];

export default navigationConfig;
