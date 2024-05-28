import { memo, forwardRef, useMemo } from "react";
import classNames from "classnames";
import type { ComponentPropsWithRef, ElementType } from "react";

export interface THeadProps extends ComponentPropsWithRef<"thead"> {
	asElement?: ElementType;
}

const THead = memo(
	forwardRef<HTMLElement, THeadProps>((props, ref) => {
		const {
			asElement: Component = "thead",
			children,
			className,
			...rest
		} = props;

		const tHeadClass = useMemo(() => {
			return classNames(Component !== "thead" && "thead", className);
		}, [Component, className]);

		return (
			<Component className={tHeadClass} {...rest} ref={ref}>
				{children}
			</Component>
		);
	})
);

export default THead;
