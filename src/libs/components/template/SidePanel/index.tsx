import classNames from "classnames";
import { HiOutlineCog } from "react-icons/hi";
import type { CommonProps } from "@app-core/@types/common";

import Drawer from "@libs/components/ui/Drawer";
import withHeaderItem from "@libs/utils/hoc/withHeaderItem";

import ThemeConfigurator, {
    ThemeConfiguratorProps,
} from "../ThemeConfigurator";
import { useTheme } from "@libs/hooks/useTheme";

type SidePanelProps = ThemeConfiguratorProps & CommonProps;

const _SidePanel = (props: SidePanelProps) => {
    const { className, ...rest } = props;

    const { ThemeActions, panelExpand, direction } = useTheme();

    const openPanel = () => {
        ThemeActions.setPanelExpand(true);
    };

    const closePanel = () => {
        ThemeActions.setPanelExpand(false);
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
                isOpen={panelExpand}
                placement={direction === "rtl" ? "left" : "right"}
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
