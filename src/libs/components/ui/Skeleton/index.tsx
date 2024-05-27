import { memo, forwardRef, useMemo, ElementType } from "react";
import classNames from "classnames";
import { CommonProps } from "@app-core/@types/common";

export interface SkeletonProps extends CommonProps {
	animation?: boolean;
	asElement?: ElementType;
	height?: string | number;
	variant?: "block" | "circle";
	width?: string | number;
}

const Skeleton = memo(
	forwardRef<ElementType, SkeletonProps>((props, ref) => {
		const {
			animation = true,
			asElement: Component = "span",
			className,
			height,
			style,
			variant = "block",
			width,
		} = props;

		const _classname = useMemo(() => {
			return classNames(
				"skeleton",
				variant === "circle" && "skeleton-circle",
				variant === "block" && "skeleton-block",
				animation && "animate-pulse",
				className
			);
		}, [animation, className, variant]);

		return (
			<Component
				ref={ref}
				className={_classname}
				style={{
					width,
					height,
					...style,
				}}
			/>
		);
	})
);

export default Skeleton;
