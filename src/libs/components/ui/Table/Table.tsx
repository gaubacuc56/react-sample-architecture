import {
	forwardRef,
	memo,
	useMemo,
	ComponentPropsWithRef,
	ElementType,
} from "react";
import classNames from "classnames";

export interface TableProps extends ComponentPropsWithRef<"table"> {
	asElement?: ElementType;
	borderlessRow?: boolean;
	compact?: boolean;
	hoverable?: boolean;
	overflow?: boolean;
}

const Table = memo(
	forwardRef<HTMLElement, TableProps>((props, ref) => {
		const {
			asElement: Component = "table",
			borderlessRow,
			children,
			className,
			compact = false,
			hoverable = true,
			overflow = true,
			...rest
		} = props;

		const tableClass = useMemo(() => {
			return classNames(
				Component === "table" ? "table-default" : "table-flex",
				hoverable && "table-hover",
				compact && "table-compact",
				borderlessRow && "borderless-row",
				className
			);
		}, [Component, borderlessRow, className, compact, hoverable]);

		return (
			<div className={classNames(overflow && "overflow-auto h-[74vh]")}>
				<Component className={tableClass} {...rest} ref={ref}>
					{children}
				</Component>
			</div>
		);
	})
);

export default Table;
