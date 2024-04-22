import { forwardRef } from 'react'
import classNames from 'classnames'

import type { CommonProps } from '@app-core/@types/common'
import { MenuVariant } from '@app-core/@types/theme'
import { MenuContextProvider } from './context/menuContext'

import { useThemeConfig } from '@libs/hooks/useThemeConfig'

export interface MenuProps extends CommonProps {
    defaultActiveKeys?: Array<string>
    defaultExpandedKeys?: Array<string>
    menuItemHeight?: number
    onSelect?: (eventKey: string, e: MouseEvent) => void
    sideCollapsed?: boolean
    variant?: MenuVariant
}

const menuDefaultClass = 'menu'

const Menu = forwardRef<HTMLElement, MenuProps>((props, ref) => {
    const {
        children,
        className,
        defaultActiveKeys = [],
        defaultExpandedKeys = [],
        menuItemHeight = 40,
        onSelect,
        sideCollapsed = false,
        variant = 'light',
        ...rest
    } = props

    const { themeColor, primaryColorLevel } = useThemeConfig()

    const menuColor = () => {
        if (variant === 'themed') {
            return `bg-${themeColor}-${primaryColorLevel} ${menuDefaultClass}-${variant}`
        }
        return `${menuDefaultClass}-${variant}`
    }

    const menuClass = classNames(menuDefaultClass, menuColor(), className)

    return (
        <nav ref={ref} className={menuClass} {...rest}>
            <MenuContextProvider
                value={{
                    onSelect,
                    menuItemHeight,
                    variant,
                    sideCollapsed,
                    defaultExpandedKeys,
                    defaultActiveKeys,
                }}
            >
                {children}
            </MenuContextProvider>
        </nav>
    )
})

export default Menu
