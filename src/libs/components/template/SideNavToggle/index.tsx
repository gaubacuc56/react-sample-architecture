import type { CommonProps } from "@app-core/@types/common";

import withHeaderItem from "@libs/utils/hoc/withHeaderItem";
import useResponsive from "@libs/hooks/useResponsive";
import NavToggle from "@libs/components/shared/NavToggle";
import { useTheme } from "@libs/hooks/useTheme";

const _SideNavToggle = ({ className }: CommonProps) => {
    const { layout, ThemeActions } = useTheme();

    const sideNavCollapse = layout.sideNavCollapse;

    const { larger } = useResponsive();

    const onCollapse = () => {
        ThemeActions.setSideNavCollapse(!sideNavCollapse);
    };

    return (
        <>
            {larger.md && (
                <div className={className} onClick={onCollapse}>
                    <NavToggle className="text-2xl" toggled={sideNavCollapse} />
                </div>
            )}
        </>
    );
};

const SideNavToggle = withHeaderItem(_SideNavToggle);

export default SideNavToggle;
