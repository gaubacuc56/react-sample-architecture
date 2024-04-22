import { useContext, ReactNode } from 'react'
import classNames from 'classnames'
import type { CommonProps } from '@app-core/@types/common'

import { GroupContextProvider } from './context/groupContext'
import MenuContext from './context/menuContext'

import useUniqueId from '@libs/hooks/useUniqueId'

export interface MenuGroupProps extends CommonProps {
    label: string | ReactNode
}

const menuGroupDefaultClass = 'menu-group'

const MenuGroup =(props: MenuGroupProps) => {
    const { label, children, className } = props

    const { variant, sideCollapsed } = useContext(MenuContext)

    const menuGroupClass = classNames(menuGroupDefaultClass, className)

    const entityHeaderId = useUniqueId('entity-header-')

    return (
        <div className={menuGroupClass}>
            {label && !sideCollapsed && (
                <div
                    className={classNames(
                        'menu-title',
                        `menu-title-${variant}`
                    )}
                    id={entityHeaderId}
                >
                    {label}
                </div>
            )}
            <GroupContextProvider value={null}>
                <ul>{children}</ul>
            </GroupContextProvider>
        </div>
    )
}

export default MenuGroup
