import type { ReactNode } from 'react'

import {
    HiCheckCircle,
    HiInformationCircle,
    HiExclamation,
    HiXCircle,
} from 'react-icons/hi'
import type {  CommonProps } from '@app-core/@types/common'
import type {  Status } from '@app-core/@types/theme'


export interface StatusIconProps extends CommonProps {
    type: Status
    custom?: ReactNode | JSX.Element
    iconColor?: string
}

const ICONS: Record<
    Status,
    {
        color: string
        icon: JSX.Element
    }
> = {
    success: {
        color: 'text-emerald-400',
        icon: <HiCheckCircle />,
    },
    info: {
        color: 'text-blue-400',
        icon: <HiInformationCircle />,
    },
    warning: {
        color: 'text-yellow-400',
        icon: <HiExclamation />,
    },
    danger: {
        color: 'text-red-400',
        icon: <HiXCircle />,
    },
}

const StatusIcon = (props: StatusIconProps) => {
    const { type = 'info', custom, iconColor } = props

    const icon = ICONS[type]

    return (
        <span className={`text-2xl ${iconColor || icon.color}`}>
            {custom || icon.icon}
        </span>
    )
}

export default StatusIcon
