import { useMemo } from "react";
import classNames from "classnames";
// import ScrollBar from '@/components/ui/ScrollBar'
import { THEME_ENUM } from "@/constant/theme.constant";

import navigationConfig from "@config/navigation.config";
import VerticalMenuContent from "@libs/components/template/VerticalMenuContent";
import useResponsive from "@libs//hooks/useResponsive";
import { useAppSelector } from "@app-core/redux-manager/hooks";
import { useThemeConfig } from "@/libs/hooks/useThemeConfig";

import appLogo from "@assets/img/logo.png";

const sideNavStyle = {
    width: THEME_ENUM.SIDE_NAV_WIDTH,
    minWidth: THEME_ENUM.SIDE_NAV_WIDTH,
};

const sideNavCollapseStyle = {
    width: THEME_ENUM.SIDE_NAV_COLLAPSED_WIDTH,
    minWidth: THEME_ENUM.SIDE_NAV_COLLAPSED_WIDTH,
};

const SideNav = () => {
    const { themeColor, primaryColorLevel, direction, layout, navMode } =
        useThemeConfig();

    const sideNavCollapse = layout.sideNavCollapse;
    const currentRouteKey = useAppSelector(
        (state) => state.routeReducer.currentRouteKey
    );

    const userAuthority = useAppSelector(
        (state) => state.authReducer.authority
    );

    const { larger } = useResponsive();

    const sideNavColor = useMemo(() => {
        if (navMode === THEME_ENUM.NAV_MODE_THEMED) {
            return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`;
        }
        return `side-nav-${navMode}`;
    }, [navMode, primaryColorLevel, themeColor]);

    const menuContent = useMemo(() => {
        return (
            <VerticalMenuContent
                navMode={navMode}
                collapsed={sideNavCollapse}
                navigationTree={navigationConfig}
                routeKey={currentRouteKey}
                userAuthority={userAuthority as string[]}
                direction={direction}
            />
        );
    }, [currentRouteKey, direction, navMode, sideNavCollapse, userAuthority]);

    return (
        <>
            {larger.md && (
                <div
                    style={
                        sideNavCollapse ? sideNavCollapseStyle : sideNavStyle
                    }
                    className={classNames(
                        "side-nav",
                        sideNavColor,
                        !sideNavCollapse && "side-nav-expand"
                    )}
                >
                    <div className="side-nav-header px-6 py-4">
                        <img className="w-10" src={appLogo} />
                    </div>
                    {sideNavCollapse ? (
                        menuContent
                    ) : (
                        <div className="side-nav-content">
                            {/* <ScrollBar autoHide direction={direction}> */}
                            <VerticalMenuContent
                                navMode={navMode}
                                collapsed={sideNavCollapse}
                                navigationTree={navigationConfig}
                                routeKey={currentRouteKey}
                                userAuthority={userAuthority as string[]}
                                direction={direction}
                            />
                            {/* </ScrollBar> */}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default SideNav;
