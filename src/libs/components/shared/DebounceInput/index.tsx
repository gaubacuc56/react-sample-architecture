import {
	useState,
	useEffect,
	useCallback,
	ChangeEvent,
	CSSProperties,
} from "react";

import Input from "@libs/components/ui/Input";

interface IDebounceInputProps {
	/**
	 * Value of text input
	 */
	value: string | number;
	onChange: (value: string | number) => void;
	/**
	 * Delay time after typing ( milisecond )
	 */
	debounce?: number;
	/**
	 * Display icon on the right input field
	 */
	leftIcon?: React.ReactNode;
	/**
	 * Custom style for the input
	 */
	additionalInputStyle?: CSSProperties;
	/**
	 * Classname for  additional styling
	 */
	extra?: string;
}
export function DebounceInput(
	props: IDebounceInputProps &
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">
) {
	const {
		value: initialValue,
		onChange,
		debounce = 500,
		placeholder,
		leftIcon,
		additionalInputStyle,
		extra,
		...otherDebounceInputProps
	} = props;

	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);
		return () => clearTimeout(timeout);
	}, [value, debounce, onChange]);

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	return (
		<Input
			leftIcon={leftIcon}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
			additionalInputStyle={additionalInputStyle}
			extra={extra}
			{...otherDebounceInputProps}
		/>
	);
}
