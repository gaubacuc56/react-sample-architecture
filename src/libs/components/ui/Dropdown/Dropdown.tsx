import { forwardRef, useRef, useCallback, SyntheticEvent, CSSProperties } from 'react'

import type { CommonProps } from '@app-core/@types/common'
import type { DropdownPlacement } from '@app-core/@types/placement'

import { chainedFunction } from '@libs/utils//helper/common'
import useRootClose from '@libs/hooks/useRootClose'
import {arrayIndexOf} from '@libs/utils//helper/common'
import { PLACEMENT } from '@constant/theme.constant'

import DropdownMenu from './DropdownMenu'
import DropdownToggle from './DropdownToggle'
import useUniqueId from '@libs/hooks/useUniqueId'
import DropdownContext from './context/dropdownContext'
import DropdownMenuContext, {
    useDropdownMenuContext,
} from './context/dropdownMenuContext'

import type { DropdownToggleSharedProps } from './DropdownToggle'

export interface DropdownProps extends CommonProps, DropdownToggleSharedProps {
    title?: string
    menuClass?: string
    menuStyle?: CSSProperties
    disabled?: boolean
    activeKey?: string
    trigger?: 'click' | 'hover' | 'context'
    onClick?: (event: SyntheticEvent) => void
    onMouseEnter?: (event: SyntheticEvent) => void
    onMouseLeave?: (event: SyntheticEvent) => void
    onContextMenu?: (event: SyntheticEvent) => void
    onSelect?: (eventKey: string, event: SyntheticEvent) => void
    onOpen?: () => void
    onClose?: () => void
    onToggle?: (open?: boolean) => void
}

const { BOTTOM_START } = PLACEMENT as Record<string, DropdownPlacement>

const CLICK = 'click'
const HOVER = 'hover'
const CONTEXT = 'context'

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
    const {
        title,
        children,
        menuClass,
        menuStyle,
        disabled,
        renderTitle,
        placement = BOTTOM_START,
        activeKey,
        toggleClassName,
        trigger = 'click',
        style,
        onClick,
        onMouseEnter,
        onMouseLeave,
        onContextMenu,
        onSelect,
        onOpen,
        onClose,
        onToggle,
        ...rest
    } = props

    const overlayTarget = useRef(null)
    const triggerTarget = useRef(null)
    const menuControl = useDropdownMenuContext(overlayTarget)
    const open = menuControl.open

    const buttonId = useUniqueId('dropdown-toggle-')
    const menuId = useUniqueId('base-menu-')

    const handleToggle = useCallback(
        (isOpen?: boolean) => {
            const nextOpen = typeof isOpen === 'undefined' ? !open : isOpen
            const fn = nextOpen ? onOpen : onClose

            fn?.()
            onToggle?.(nextOpen)
            if (nextOpen) {
                menuControl.openMenu()
            } else {
                menuControl.closeMenu()
            }
        },
        [onClose, onOpen, onToggle, open, menuControl]
    )

    const handleClick = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault()
            if (disabled) {
                return
            }
            handleToggle()
        },
        [disabled, handleToggle]
    )

    const handleMouseEnter = useCallback(() => {
        if (!disabled) {
            handleToggle(true)
        }
    }, [disabled, handleToggle])

    const handleMouseLeave = useCallback(() => {
        if (!disabled) {
            handleToggle(false)
        }
    }, [disabled, handleToggle])

    const handleSelect = (eventKey: string, event: SyntheticEvent) => {
        onSelect?.(eventKey, event)
        handleToggle(false)
    }

    useRootClose(() => handleToggle(), {
        triggerTarget,
        overlayTarget,
        disabled: !open,
        listenEscape: false,
    })

    const dropdownProps = {
        onMouseEnter,
        onMouseLeave,
    }

    const toggleEventHandlers = {
        onClick: onClick,
        onContextMenu,
    }

    if (arrayIndexOf(CLICK, trigger)) {
        toggleEventHandlers.onClick = chainedFunction(
            handleClick,
            toggleEventHandlers.onClick
        )
    }

    if (arrayIndexOf(CONTEXT, trigger)) {
        toggleEventHandlers.onContextMenu = chainedFunction(
            handleClick,
            onContextMenu
        )
    }

    if (arrayIndexOf(HOVER, trigger)) {
        dropdownProps.onMouseEnter = chainedFunction(
            handleMouseEnter,
            onMouseEnter
        )
        dropdownProps.onMouseLeave = chainedFunction(
            handleMouseLeave,
            onMouseLeave
        )
    }

    const toggleElement = (
        <DropdownToggle
            {...rest}
            {...toggleEventHandlers}
            ref={triggerTarget}
            id={buttonId}
            className={toggleClassName}
            renderTitle={renderTitle}
            disabled={disabled}
            placement={placement}
        >
            {title}
        </DropdownToggle>
    )

    const menuElement = (
        <DropdownMenu
            ref={overlayTarget}
            className={menuClass}
            style={menuStyle}
            activeKey={activeKey}
            hidden={!open}
            placement={placement}
            id={menuId}
            onSelect={handleSelect}
        >
            {children}
        </DropdownMenu>
    )

    return (
        <DropdownContext.Provider value={{ activeKey }}>
            <div
                {...dropdownProps}
                ref={ref}
                style={style}
                className="dropdown"
            >
                {toggleElement}
                <DropdownMenuContext.Provider value={menuControl}>
                    {menuElement}
                </DropdownMenuContext.Provider>
            </div>
        </DropdownContext.Provider>
    )
})

export default Dropdown
