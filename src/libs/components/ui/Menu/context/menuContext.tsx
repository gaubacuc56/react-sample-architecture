import { createContext } from 'react'
import { MenuVariant } from '@app-core/@types/theme'

export interface MenuContextProps {
    defaultActiveKeys?: Array<string>
    defaultExpandedKeys?: Array<string>
    menuItemHeight?: number
    onSelect?: (eventKey: string, e: MouseEvent) => void
    sideCollapsed?: boolean
    variant?: MenuVariant
}

const MenuContext = createContext<MenuContextProps>({})

export const MenuContextProvider = MenuContext.Provider

export const MenuContextConsumer = MenuContext.Consumer

export default MenuContext
