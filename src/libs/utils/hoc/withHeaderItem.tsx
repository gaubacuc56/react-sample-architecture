import classNames from "classnames";
import type { ComponentType, FC } from "react";

export type WithHeaderItemProps = {
    className?: string;
    hoverable?: boolean;
};

const withHeaderItem = <T extends WithHeaderItemProps>(
    Component: ComponentType<Omit<T, keyof WithHeaderItemProps>>
): FC<T> => {
    const WithHeaderItem: FC<T> = (props: T) => {
        const { className, hoverable = true } = props;
        return (
            <Component
                {...(props as Omit<T, keyof WithHeaderItemProps>)}
                className={classNames(
                    "cursor-pointer p-2 rounded-full mx-1",
                    hoverable &&
                        "hover:bg-black hover:bg-opacity-5 hover:text-gray-900 dark:hover:bg-black dark:hover:text-gray-100 dark:hover:bg-opacity-40 transition-colors duration-300 ease-in-out",
                    className
                )}
            />
        );
    };
    WithHeaderItem.displayName = `withHeaderItem(${
        Component.displayName || Component.name || "Component"
    })`;
    return WithHeaderItem;
};

export default withHeaderItem;
