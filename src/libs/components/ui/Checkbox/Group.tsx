import {
	forwardRef,
	useState,
	useCallback,
	useMemo,
	useEffect,
	SyntheticEvent,
} from "react";
import classNames from "classnames";
import cloneDeep from "lodash/cloneDeep";
import remove from "lodash/remove";

import { shallowEqual } from "@libs/utils/helper/common";
import type { CommonProps } from "@app-core/@types/common";

import {
	CheckboxGroupContextProvider,
	CheckboxGroupValue,
	CheckboxValue,
} from "./context";

export interface CheckboxGroupProps extends CommonProps {
	color?: string;
	name?: string;
	onChange?: (value: CheckboxGroupValue, event: SyntheticEvent) => void;
	value?: CheckboxGroupValue;
	vertical?: boolean;
}

const Group = forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {
	const {
		children,
		className,
		color,
		name,
		onChange,
		value: valueProp,
		vertical,
		...rest
	} = props;

	const [value, setValue] = useState(valueProp);

	const onCheckboxGroupChange = useCallback(
		(
			itemValue: CheckboxValue,
			itemChecked: boolean,
			event: SyntheticEvent
		) => {
			const nextValue = cloneDeep(value) || [];
			if (itemChecked) {
				nextValue.push(itemValue as never);
			} else {
				remove(nextValue as string[], (i) =>
					shallowEqual(i, itemValue)
				);
			}

			setValue(nextValue);
			onChange?.(nextValue, event);
		},
		[onChange, setValue, value]
	);

	useEffect(() => {
		setValue(valueProp);
	}, [valueProp]);

	const checkboxGroupDefaultClass = `inline-flex ${
		vertical ? "flex-col gap-y-2" : ""
	}`;

	const checkBoxGroupClass = classNames(checkboxGroupDefaultClass, className);

	const contextValue = useMemo(
		() => ({
			vertical,
			name,
			value,
			color,
			onChange: onCheckboxGroupChange,
		}),
		[vertical, onCheckboxGroupChange, name, color, value]
	);

	return (
		<CheckboxGroupContextProvider value={contextValue}>
			<div ref={ref} className={checkBoxGroupClass} {...rest}>
				{children}
			</div>
		</CheckboxGroupContextProvider>
	);
});

Group.displayName = "CheckboxGroup";

export default Group;
