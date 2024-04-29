import classNames from "classnames";
import { SIZES } from "@constant/theme.constant";
import type { CommonProps } from "@app-core/@types/common";
import { useMemo } from "react";

interface LineProps extends CommonProps {
    percent: number;
    strokeColor?: string;
    size?: "sm" | "md";
    isIndeterminate?: boolean;
}

const Line = (props: LineProps) => {
    const {
        percent,
        size,
        children,
        strokeColor,
        isIndeterminate = false,
    } = props;

    const progressBackgroundClass = useMemo(() => {
        return classNames(
            "progress-bg",
            size === SIZES.SM ? "h-1.5" : "h-2",
            `bg-${strokeColor}`
        );
    }, [size, strokeColor]);

    const progressInnerClass = useMemo(() => {
        return classNames(
            `bg-${strokeColor}`,
            isIndeterminate ? "progess-line-infinite-loop" : "progress-inner"
        );
    }, [isIndeterminate, strokeColor]);

    return (
        <>
            <div className="progress-wrapper">
                <div className={progressInnerClass}>
                    <div
                        className={progressBackgroundClass}
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>
            {children}
        </>
    );
};

Line.displayName = "ProgressLine";

export default Line;
