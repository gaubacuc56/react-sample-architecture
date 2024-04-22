import { forwardRef, ReactNode } from 'react'
import classNames from 'classnames'
import {
    HiChevronDown,
    HiChevronUp,
    HiChevronRight,
    HiChevronLeft,
} from 'react-icons/hi'
import type { CommonProps } from '@app-core/@types/common'
import type { DropdownPlacement } from '@app-core/@types/placement'

export interface DropdownToggleSharedProps {
    renderTitle?: ReactNode
    placement?: DropdownPlacement
    toggleClassName?: string
}

interface DropdownToggleProps extends CommonProps, DropdownToggleSharedProps {
    disabled?: boolean
    id?: string
}

const DropdownToggleDefaultContent = ({
    placement,
    children,
}: {
    placement: DropdownPlacement
    children: string | ReactNode
}) => {
    if (placement && placement.includes('middle-start')) {
        return (
            <>
                {children}
                <HiChevronRight />
            </>
        )
    }

    if (placement && placement.includes('middle-end')) {
        return (
            <>
                <HiChevronLeft />
                {children}
            </>
        )
    }

    if (placement && placement.includes('top')) {
        return (
            <>
                {children}
                <HiChevronUp />
            </>
        )
    }

    return (
        <>
            {children}
            <HiChevronDown />
        </>
    )
}

const toggleClass = 'dropdown-toggle'
const disabledClass = 'dropdown-toggle-disabled'

const DropdownToggle = forwardRef<HTMLDivElement, DropdownToggleProps>(
    (props, ref) => {
        const {
            className,
            renderTitle,
            children,
            placement = 'bottom-start',
            disabled,
            toggleClassName,
            ...rest
        } = props

        const dropdownToggleClass = classNames(
            toggleClass,
            className,
            toggleClassName,
            disabled && disabledClass
        )

        const dropdownToggleDefaultClass = classNames(
            dropdownToggleClass,
            'dropdown-toggle-default'
        )

        if (renderTitle) {
            return (
                <div className={dropdownToggleClass} {...rest} ref={ref}>
                    {renderTitle}
                </div>
            )
        }

        return (
            <div ref={ref} className={dropdownToggleDefaultClass} {...rest}>
                <span className="flex items-center">
                    <DropdownToggleDefaultContent placement={placement}>
                        {children}
                    </DropdownToggleDefaultContent>
                </span>
            </div>
        )
    }
)

export default DropdownToggle
