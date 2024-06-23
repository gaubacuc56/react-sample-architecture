import { forwardRef, ElementType, memo } from "react";
import classNames from "classnames";
import { CgSpinner } from "react-icons/cg";

import type { CommonProps } from "@app-core/@types/common";

import { useTheme } from "@libs/hooks/useTheme";

export interface SpinnerProps extends CommonProps {
    color?: string;
    enableTheme?: boolean;
    indicator?: ElementType;
    isSpining?: boolean;
    size?: string | number;
}

const Spinner = memo(
    forwardRef((props: SpinnerProps, ref) => {
        const {
            className,
            color,
            enableTheme = true,
            indicator: Component = CgSpinner,
            isSpining = true,
            size = 25,
            style,
            ...rest
        } = props;

        const { themeColor, primaryColorLevel } = useTheme();

        const spinnerColor =
            color ||
            (enableTheme && primaryColorLevel > 400
                ? `${themeColor}-${200}`
                : "white");

        const spinnerStyle = {
            height: size,
            width: size,
            ...style,
        };

        const spinnerClass = classNames(
            isSpining && "animate-spin",
            spinnerColor && `text-${spinnerColor}`,
            className
        );

        return (
            <Component
                ref={ref}
                style={spinnerStyle}
                className={spinnerClass}
                {...rest}
            />
        );
    })
);

export default Spinner;
