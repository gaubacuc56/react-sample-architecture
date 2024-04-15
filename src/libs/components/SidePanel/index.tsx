import classNames from "classnames";
import Drawer from "../Drawer";
import { HiOutlineCog } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import withHeaderItem from "@libs/utils/hoc/withHeaderItem";
import {
    setPanelExpand,
    panelExpand,
    direction,
} from "@libs/features/theme/theme.slice";
import type { CommonProps } from "@app-core/@types/common";
import ThemeConfigurator, {
    ThemeConfiguratorProps,
} from "../ThemeConfigurator";
import { useThemeConfig } from "@/libs/hooks/useThemeConfig";

type SidePanelProps = ThemeConfiguratorProps & CommonProps;

const _SidePanel = (props: SidePanelProps) => {
    const dispatch = useDispatch();

    const { className, ...rest } = props;

    const _panelExpand = useSelector(panelExpand);

    const _direction = useSelector(direction);

    const { themeColor, primaryColorLevel } = useThemeConfig();

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
                className={classNames(
                    `fixed right-0 top-5 md:top-auto p-3 rounded-none rounded-tl-lg rounded-bl-lg text-white text-xl cursor-pointer select-none bg-${themeColor}-${primaryColorLevel}`,
                    className
                )}
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
                <ThemeConfigurator callBackClose={closePanel} />
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
