import classNames from "classnames";
import { HiOutlineCog } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@app-core/redux-manager/hooks";
import type { CommonProps } from "@app-core/@types/common";

import Drawer from "@libs/components/ui/Drawer";
import withHeaderItem from "@libs/utils/hoc/withHeaderItem";
import {
    setPanelExpand,
 
} from "@libs/features/store";
import { useThemeConfig } from "@/libs/hooks/useThemeConfig";

import ThemeConfigurator, {
    ThemeConfiguratorProps,
} from "../ThemeConfigurator";

type SidePanelProps = ThemeConfiguratorProps & CommonProps;

const _SidePanel = (props: SidePanelProps) => {
    
    const { className, ...rest } = props;

    const dispatch = useAppDispatch();

    const _panelExpand = useAppSelector(state => state.themeReducer.panelExpand);

    const _direction = useAppSelector(state => state.themeReducer.direction);

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
