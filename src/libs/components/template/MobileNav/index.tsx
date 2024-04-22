import { useState, Suspense, lazy } from 'react'
import classNames from 'classnames'
import navigationConfig from '@config/navigation.config'

import { useAppSelector } from '@app-core/redux-manager/hooks'

import { THEME_ENUM } from '@constant/theme.constant.ts'

import Drawer from '@libs/components/ui/Drawer'
import withHeaderItem, { WithHeaderItemProps } from '@libs/utils/hoc/withHeaderItem'
import NavToggle from '@libs/components/shared/NavToggle'
import useResponsive from '@libs/hooks/useResponsive'
import { useThemeConfig } from '@libs/hooks/useThemeConfig'

const VerticalMenuContent = lazy(
    () => import('@libs/components/template/VerticalMenuContent')
)

type MobileNavToggleProps = {
    toggled?: boolean
}

const MobileNavToggle = withHeaderItem<
    MobileNavToggleProps & WithHeaderItemProps
>(NavToggle)

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const  { themeColor, primaryColorLevel, mode, direction, layout, navMode } = useThemeConfig();
    const sideNavCollapse = layout.sideNavCollapse

    const currentRouteKey = useAppSelector(
        (state) => state.routeReducer.currentRouteKey
    )
    const userAuthority = useAppSelector((state) => state.authReducer.authority)

    const { smaller } = useResponsive()

    const navColor = () => {
        if (navMode === THEME_ENUM.NAV_MODE_THEMED) {
            return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`
        }

        if (navMode === THEME_ENUM.NAV_MODE_TRANSPARENT) {
            return `side-nav-${mode}`
        }

        return `side-nav-${navMode}`
    }

    return (
        <>
            {smaller.md && (
                <>
                    <div className="text-2xl" onClick={openDrawer}>
                        <MobileNavToggle toggled={isOpen} />
                    </div>
                    <Drawer
                        title="Navigation"
                        isOpen={isOpen}
                        bodyClass={classNames(navColor(), 'p-0')}
                        width={330}
                        placement={direction === THEME_ENUM.DIR_RTL ? 'right' : 'left'}
                        onClose={onDrawerClose}
                        onRequestClose={onDrawerClose}
                    >
                        <Suspense fallback={<></>}>
                            {isOpen && (
                                <VerticalMenuContent
                                    navMode={navMode}
                                    collapsed={sideNavCollapse}
                                    navigationTree={navigationConfig}
                                    routeKey={currentRouteKey}
                                    userAuthority={userAuthority as string[]}
                                    direction={direction}
                                    onMenuItemClick={onDrawerClose}
                                />
                            )}
                        </Suspense>
                    </Drawer>
                </>
            )}
        </>
    )
}

export default MobileNav
