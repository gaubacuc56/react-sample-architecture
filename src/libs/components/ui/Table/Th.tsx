import { memo, forwardRef } from "react";
import classNames from "classnames";
import type { ComponentPropsWithRef, ElementType } from "react";

export interface ThProps extends ComponentPropsWithRef<"th"> {
	asElement?: ElementType;
}

const Th = memo(
	forwardRef<HTMLTableCellElement, ThProps>((props, ref) => {
		const {
			asElement: Component = "th",
			children,
			className,
			...rest
		} = props;

		const thClass = classNames(Component !== "th" && "th", className);

		return (
			<Component className={thClass} {...rest} ref={ref}>
				{children}
			</Component>
		);
	})
);

export default Th;
