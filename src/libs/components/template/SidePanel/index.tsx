import classNames from "classnames";
import { HiOutlineCog } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@app-core/redux-manager/method";
import type { CommonProps } from "@app-core/@types/common";

import Drawer from "@libs/components/ui/Drawer";
import withHeaderItem from "@libs/utils/hoc/withHeaderItem";
import { setPanelExpand } from "@libs/features/store";

import ThemeConfigurator, {
	ThemeConfiguratorProps,
} from "../ThemeConfigurator";

type SidePanelProps = ThemeConfiguratorProps & CommonProps;

const _SidePanel = (props: SidePanelProps) => {
	const { className, ...rest } = props;

	const dispatch = useAppDispatch();

	const _panelExpand = useAppSelector(
		(state) => state.themeReducer.panelExpand
	);

	const _direction = useAppSelector((state) => state.themeReducer.direction);

	const openPanel = () => {
		dispatch(setPanelExpand(true));
	};

	const closePanel = () => {
		dispatch(setPanelExpand(false));
		const bodyClassList = document.body.classList;
		if (bodyClassList.contains("drawer-lock-scroll")) {
			bodyClassList.remove("drawer-lock-scroll", "drawer-open");
		}
	};

	return (
		<>
			<div
				className={classNames(className)}
				onClick={openPanel}
				{...rest}
			>
				<HiOutlineCog />
			</div>
			<Drawer
				title="Theme Config"
				isOpen={_panelExpand}
				placement={_direction === "rtl" ? "left" : "right"}
				width={375}
				onClose={closePanel}
				onRequestClose={closePanel}
			>
				<ThemeConfigurator /* callBackClose={closePanel} */ />
			</Drawer>
		</>
	);
};

const SidePanel = withHeaderItem(_SidePanel);

export default SidePanel;
/**
 * add this class to classname when integrate direction:
 * ltr:rounded-tl-md ltr:rounded-bl-md rtl:rounded-tr-md rtl:rounded-br-md
 */
