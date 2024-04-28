import { forwardRef, memo, useMemo } from "react";
import classNames from "classnames";
import type { CommonProps } from "@app-core/@types/common";
import { MenuVariant } from "@app-core/@types/theme";
import type { ElementType } from "react";

export interface MenuItemProps extends CommonProps {
    asElement?: ElementType;
    id?: string;
    disabled?: boolean;
    eventKey?: string;
    isActive?: boolean;
    menuItemHeight?: string | number;
    onSelect?: (eventKey: string, e: MouseEvent) => void;
    variant?: MenuVariant;
}

const menuItemActiveClass = `menu-item-active`;
const menuItemHoverClass = `menu-item-hoverable`;
const disabledClass = "menu-item-disabled";

const MenuItem = memo(
    forwardRef<HTMLElement, MenuItemProps>((props, ref) => {
        const {
            asElement: Component = "div",
            children,
            className,
            disabled,
            eventKey,
            isActive,
            menuItemHeight = 35,
            onSelect,
            style,
            variant = "light",
            ...rest
        } = props;

        const menuItemClass = useMemo(() => {
            return classNames(
                "mb-2 menu-item",
                `menu-item-${variant}`,
                isActive && menuItemActiveClass,
                disabled && disabledClass,
                !disabled && menuItemHoverClass,
                className
            );
        }, [variant, isActive, disabled, disabledClass, className]);

        const hanldeOnClick = (e: MouseEvent) => {
            if (onSelect) {
                onSelect(eventKey as string, e);
            }
        };

        return (
            <Component
                ref={ref}
                className={menuItemClass}
                style={{ minHeight: `${menuItemHeight}px`, ...style }}
                onClick={hanldeOnClick}
                {...rest}
            >
                {children}
            </Component>
        );
    })
);

export default MenuItem;
