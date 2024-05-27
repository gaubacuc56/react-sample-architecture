import { memo, forwardRef } from "react";
import classNames from "classnames";
import type { ComponentPropsWithRef, ElementType } from "react";

export interface TFootProps extends ComponentPropsWithRef<"tfoot"> {
	asElement?: ElementType;
}

const TFoot = memo(
	forwardRef<HTMLElement, TFootProps>((props, ref) => {
		const {
			asElement: Component = "tfoot",
			children,
			className,
			...rest
		} = props;

		const tBodyClass = classNames(
			Component !== "tfoot" && "tfoot",
			className
		);

		return (
			<Component className={tBodyClass} {...rest} ref={ref}>
				{children}
			</Component>
		);
	})
);

export default TFoot;
