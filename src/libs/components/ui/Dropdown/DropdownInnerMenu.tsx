import { forwardRef, SyntheticEvent, RefObject, Ref  } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import type { CommonProps } from '@app-core/@types/common'
import type { DropdownPlacement } from '@app-core/@types/placement'
import { MenuContextProvider } from './context/menuContext'

import useUniqueId from '@libs/hooks/useUniqueId'
import useUncertainRef from '@libs/hooks/useUncertainRef'

import {
    useDropdownMenuContext,
    DropdownMenuContextProvider,
} from './context/dropdownMenuContext'

export interface DropdownInnerMenuProps extends CommonProps {
    activeKey?: string
    onSelect?: (eventKey: string, event: SyntheticEvent) => void
    hidden?: boolean
    placement?: DropdownPlacement
    menuClass?: string
}

const Menu = forwardRef<HTMLElement, DropdownInnerMenuProps>((props, ref) => {
    const {
        children,
        activeKey,
        onSelect,
        hidden,
        placement,
        menuClass,
        ...rest
    } = props

    const menuRef = useUncertainRef<HTMLElement>(ref)
    const menuId = useUniqueId('menu-')
    const menuControl = useDropdownMenuContext<HTMLElement>(
        menuRef as RefObject<HTMLElement>
    )

    const getTransform = (deg: number) => {
        const rotate = `rotateX(${deg}deg)`
        if (placement && placement.includes('center')) {
            return `${rotate} translateX(-50%)`
        }
        return rotate
    }

    const enterStyle = {
        opacity: 1,
        visibility: 'visible',
        transform: getTransform(0),
    } as const
    const exitStyle = {
        opacity: 0,
        visibility: 'hidden',
        transform: getTransform(40),
    } as const
    const initialStyle = exitStyle

    return (
        <MenuContextProvider
            value={{
                activeKey,
                onSelect,
            }}
        >
            <DropdownMenuContextProvider value={menuControl}>
                <AnimatePresence mode="wait">
                    {!hidden && (
                        <motion.ul
                            ref={menuRef as Ref<HTMLUListElement>}
                            id={menuId}
                            initial={initialStyle}
                            animate={enterStyle}
                            exit={exitStyle}
                            transition={{ duration: 0.15, type: 'tween' }}
                            className={menuClass}
                            {...rest}
                        >
                            {children}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </DropdownMenuContextProvider>
        </MenuContextProvider>
    )
})

export default Menu
