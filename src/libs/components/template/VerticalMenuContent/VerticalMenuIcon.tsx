import type { ElementType, ComponentPropsWithRef } from "react";
import navigationIcon from "@config/navigation-icon.config";
import { IconType } from "react-icons";
type VerticalMenuIconProps = {
    icon?: JSX.Element;
};

export const Icon = <T extends ElementType>({
    component,
    ...props
}: {
    header: T;
} & ComponentPropsWithRef<T>) => {
    const Component = component;
    return <Component {...props} />;
};

const VerticalMenuIcon = ({ icon }: VerticalMenuIconProps) => {
    if (typeof icon !== "string" && !icon) {
        return <></>;
    }

    return ;
};

VerticalMenuIcon.defaultProps = {
    gutter: true,
};

export default VerticalMenuIcon;
