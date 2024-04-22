import type { ElementType, ComponentPropsWithRef } from 'react'
import navigationIcon from '@config/navigation-icon.config'

type VerticalMenuIconProps = {
    icon: string
}

export const Icon = <T extends ElementType>({
    component,
    ...props
}: {
    header: T
} & ComponentPropsWithRef<T>) => {
    const Component = component
    return <Component {...props} />
}

const VerticalMenuIcon = ({ icon }: VerticalMenuIconProps) => {
    if (typeof icon !== 'string' && !icon) {
        return <></>
    }

    return (
        <span className={`text-2xl mr-2`}>
            {navigationIcon[icon]}
        </span>
    )
}

VerticalMenuIcon.defaultProps = {
    gutter: true,
}

export default VerticalMenuIcon
