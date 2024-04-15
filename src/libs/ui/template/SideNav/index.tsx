import classNames from 'classnames'
// import ScrollBar from '@/components/ui/ScrollBar'
import { THEME_ENUM } from '@/constant/theme.constant'

import Logo from '@/components/template/Logo'
import navigationConfig from '@/configs/navigation.config'
import VerticalMenuContent from '@/components/template/VerticalMenuContent'
import useResponsive from '@libs//hooks/useResponsive'
import { useAppSelector } from '@/store'

const sideNavStyle = {
    width: THEME_ENUM.SIDE_NAV_WIDTH,
    minWidth: THEME_ENUM.SIDE_NAV_WIDTH,
}

const sideNavCollapseStyle = {
    width: THEME_ENUM.SIDE_NAV_COLLAPSED_WIDTH,
    minWidth: THEME_ENUM.SIDE_NAV_COLLAPSED_WIDTH,
}

const SideNav = () => {
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel
    )
    const navMode = useAppSelector((state) => state.theme.navMode)
    const mode = useAppSelector((state) => state.theme.mode)
    const direction = useAppSelector((state) => state.theme.direction)
    const currentRouteKey = useAppSelector(
        (state) => state.base.common.currentRouteKey
    )
    const sideNavCollapse = useAppSelector(
        (state) => state.theme.layout.sideNavCollapse
    )
    const userAuthority = useAppSelector((state) => state.auth.user.authority)

    const { larger } = useResponsive()

    const sideNavColor = () => {
        if (navMode === THEME_ENUM.NAV_MODE_THEMED) {
            return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`
        }
        return `side-nav-${navMode}`
    }

    const logoMode = () => {
        if (navMode === THEME_ENUM.NAV_MODE_THEMED) {
            return THEME_ENUM.NAV_MODE_DARK
        }

        if (navMode === THEME_ENUM.NAV_MODE_TRANSPARENT) {
            return mode
        }

        return navMode
    }

    const menuContent = (
        <VerticalMenuContent
            navMode={navMode}
            collapsed={sideNavCollapse}
            navigationTree={navigationConfig}
            routeKey={currentRouteKey}
            userAuthority={userAuthority as string[]}
            direction={direction}
        />
    )

    return (
        <>
            {larger.md && (
                <div
                    style={
                        sideNavCollapse ? sideNavCollapseStyle : sideNavStyle
                    }
                    className={classNames(
                        'side-nav',
                        sideNavColor(),
                        !sideNavCollapse && 'side-nav-expand'
                    )}
                >
                    <div className="side-nav-header">
                        <Logo
                            mode={logoMode()}
                            type={sideNavCollapse ? 'streamline' : 'full'}
                            className={
                                sideNavCollapse
                                    ? THEME_ENUM.SIDE_NAV_CONTENT_GUTTER
                                    : THEME_ENUM.LOGO_X_GUTTER
                            }
                        />
                    </div>
                    {sideNavCollapse ? (
                        menuContent
                    ) : (
                        <div className="side-nav-content">
                            {/* <ScrollBar autoHide direction={direction}> */}
                                {menuContent}
                            {/* </ScrollBar> */}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default SideNav
