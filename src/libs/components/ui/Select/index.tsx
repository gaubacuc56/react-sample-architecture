import { forwardRef, Ref, ForwardedRef, useMemo } from "react";
import classNames from "classnames";
import ReactSelect, {
	ControlProps,
	Props as ReactSelectProps,
	GroupBase,
} from "react-select";
import CreatableSelect, { CreatableProps } from "react-select/creatable";
import AsyncSelect, { AsyncProps } from "react-select/async";

import tw, { theme } from "twin.macro";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";

import { HiCheck, HiChevronDown, HiX } from "react-icons/hi";

import type { CommonProps } from "@app-core/@types/common";
import { ControlSize } from "@app-core/@types/theme";

import { useThemeConfig } from "@libs/hooks/useThemeConfig";
import { CONTROL_SIZES } from "@constant/theme.constant";

import Spinner from "../Spinner";

// import { useForm } from "../Form/context";
// import { useInputGroup } from "../InputGroup/context";

export interface ISelectOption {
	label: string;
	value: string;
}

interface DefaultOptionProps {
	innerProps: JSX.IntrinsicElements["div"];
	label: string;
	selectProps: { themeColor?: string };
	isSelected: boolean;
	isDisabled: boolean;
	isFocused: boolean;
}

const DefaultOption = ({
	innerProps,
	label,
	selectProps,
	isSelected,
	isDisabled,
	isFocused,
}: DefaultOptionProps) => {
	const { themeColor } = selectProps;
	return (
		<div
			className={classNames(
				"select-option",
				isSelected && "selected",
				isDisabled && "disabled",
				isFocused && "focused"
			)}
			{...innerProps}
		>
			<span className="ml-2">{label}</span>
			{isSelected && (
				<HiCheck
					className={`text-${themeColor} dark:text-white text-xl`}
				/>
			)}
		</div>
	);
};

const DefaultDropdownIndicator = () => {
	return (
		<div className="select-dropdown-indicator">
			<HiChevronDown />
		</div>
	);
};

interface DefaultClearIndicatorProps {
	innerProps: JSX.IntrinsicElements["div"];
	ref: Ref<HTMLElement>;
}

const DefaultClearIndicator = ({
	innerProps: { ref, ...restInnerProps },
}: DefaultClearIndicatorProps) => {
	return (
		<div {...restInnerProps} ref={ref}>
			<div className="select-clear-indicator">
				<HiX />
			</div>
		</div>
	);
};

interface DefaultLoadingIndicatorProps {
	selectProps: { themeColor?: string };
}

const DefaultLoadingIndicator = ({
	selectProps,
}: DefaultLoadingIndicatorProps) => {
	const { themeColor } = selectProps;
	return (
		<Spinner className={`select-loading-indicatior text-${themeColor}`} />
	);
};

export interface SelectProps<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
> extends CommonProps,
		ReactSelectProps<Option, IsMulti, Group>,
		AsyncProps<Option, IsMulti, Group>,
		CreatableProps<Option, IsMulti, Group> {
	size?: ControlSize;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field?: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form?: any;
	componentAs?: ReactSelect | CreatableSelect | AsyncSelect;
}

function _Select<
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
>(
	props: SelectProps<Option, IsMulti, Group>,
	ref: ForwardedRef<ReactSelect | CreatableSelect | AsyncSelect>
) {
	const {
		size = "md",
		style,
		className,
		form,
		field,
		components,
		componentAs: Component = ReactSelect,
		...rest
	} = props;

	const { themeColor, primaryColorLevel, mode } = useThemeConfig();
	/*   const formControlSize = useForm()?.size;
  const inputGroupSize = useInputGroup()?.size; */

	const selectSize =
		size; /* || inputGroupSize || formControlSize || controlSize */

	const twColor: Record<string, string> = theme`colors`;
	const twHeight = theme`height`;

	let isInvalid = false;

	if (!isEmpty(form)) {
		const { touched, errors } = form;

		const touchedField = get(touched, field.name);
		const errorField = get(errors, field.name);

		isInvalid = touchedField && errorField;
	}

	const getBoxShadow = (state: ControlProps<Option, IsMulti, Group>) => {
		const shadaowBase = "0 0 0 1px ";

		if (isInvalid) {
			return shadaowBase + twColor.red["500"];
		}

		if (state.isFocused) {
			return shadaowBase + twColor[themeColor][primaryColorLevel];
		}

		return "none";
	};

	const selectClass = useMemo(() => {
		return classNames("select", `select-${selectSize}`, className);
	}, [className, selectSize]);

	return (
		<Component<Option, IsMulti, Group>
			ref={ref}
			className={selectClass}
			classNamePrefix={"select"}
			styles={{
				control: (provided, state) => {
					return {
						...provided,
						height: twHeight[CONTROL_SIZES[selectSize]],
						minHeight: twHeight[CONTROL_SIZES[selectSize]],
						"&:hover": {
							boxShadow: getBoxShadow(state),
							cursor: "pointer",
						},
						boxShadow: getBoxShadow(state),
						borderRadius: tw`rounded-md`.borderRadius,
						color:
							mode === "dark"
								? twColor.gray["400"]
								: twColor.gray["900"],
						fontSize: "14px",
						...(isInvalid
							? { borderColor: twColor.red["500"] }
							: {}),
					};
				},
				input: (css) => {
					return {
						...css,
						input: {
							outline: "none",
							outlineOffset: 0,
							boxShadow: "none !important",
						},
					};
				},
				menu: (provided) => ({ ...provided, zIndex: 50 }),
				...style,
			}}
			theme={(theme) => ({
				...theme,
				colors: {
					...theme.colors,
					neutral20:
						mode === "dark"
							? twColor.gray["600"]
							: twColor.gray["300"],
					neutral30:
						mode === "dark"
							? twColor.gray["600"]
							: twColor.gray["300"],
					neutral80: twColor.gray["700"],
					neutral10:
						mode === "dark"
							? twColor.gray["600"]
							: twColor.gray["300"],
					primary25: twColor[themeColor]["50"],
					primary50: twColor[themeColor]["100"],
					primary: twColor[themeColor][primaryColorLevel],
				},
			})}
			themeColor={`${themeColor}-${primaryColorLevel}`}
			components={{
				IndicatorSeparator: () => null,
				Option: DefaultOption,
				LoadingIndicator: DefaultLoadingIndicator,
				DropdownIndicator: DefaultDropdownIndicator,
				ClearIndicator: DefaultClearIndicator,
				...components,
			}}
			{...field}
			{...rest}
		/>
	);
}

const Select = forwardRef(_Select) as <
	Option,
	IsMulti extends boolean = false,
	Group extends GroupBase<Option> = GroupBase<Option>,
>(
	props: SelectProps<Option, IsMulti, Group> & {
		ref?: ForwardedRef<ReactSelect | CreatableSelect | AsyncSelect>;
	}
) => ReturnType<typeof _Select>;

export default Select;
