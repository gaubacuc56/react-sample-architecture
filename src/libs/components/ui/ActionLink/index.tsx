import classNames from 'classnames'
import { Link } from 'react-router-dom'
import type { CommonProps } from '@app-core/@types/common'
import type { ComponentPropsWithoutRef } from 'react'
import { useTheme } from '@libs/hooks/useTheme'

interface ActionLink extends CommonProps, ComponentPropsWithoutRef<'a'> {
    themeColor?: boolean
    to?: string
    href?: string
    reloadDocument?: boolean
}

const ActionLink = (props: ActionLink) => {
    const {
        children,
        className,
        themeColor = true,
        to,
        reloadDocument,
        href = '',
        ...rest
    } = props

    const { themeColor: defaultThemeColor, primaryColorLevel } = useTheme()

    const classNameProps = {
        className: classNames(
            themeColor && `text-${defaultThemeColor}-${primaryColorLevel}`,
            'hover:underline',
            className
        ),
    }

    return to ? (
        <Link
            to={to}
            reloadDocument={reloadDocument}
            {...classNameProps}
            {...rest}
        >
            {children}
        </Link>
    ) : (
        <a href={href} {...classNameProps} {...rest}>
            {children}
        </a>
    )
}

export default ActionLink
