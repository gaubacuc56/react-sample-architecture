import {
    forwardRef,
    useState,
    useMemo,
    useContext,
    useCallback,
    useEffect,
    memo,
    InputHTMLAttributes,
} from "react";
import classNames from "classnames";
import type { CommonProps } from "@app-core/@types/common";
import RadioGroupContext from "./context";
import { useThemeConfig } from "@/libs/hooks/useThemeConfig";

export interface RadioProps
    extends CommonProps,
        Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    checked?: boolean;
    color?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    labelRef?: string;
    name?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (value: any, e: MouseEvent) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
    vertical?: boolean;
    readOnly?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field?: any;
}

const Radio = memo(
    forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
        const {
            name: nameContext,
            disabled: disabledContext,
            value: groupValue,
            onChange: onGroupChange,
            color: colorContext,
            vertical: verticalContext,
            radioGutter,
        } = useContext(RadioGroupContext);

        const {
            children,
            className,
            checked: checkedProp,
            color,
            defaultChecked,
            disabled = disabledContext,
            field,
            labelRef,
            name = nameContext,
            onChange,
            readOnly,
            value,
            vertical = verticalContext,
            ...rest
        } = props;

        const { themeColor, primaryColorLevel } = useThemeConfig();

        const getChecked = () => {
            return typeof groupValue !== "undefined"
                ? groupValue === value
                : checkedProp;
        };

        const [radioChecked, setRadioChecked] = useState(getChecked());

        const radioColor =
            color || colorContext || `${themeColor}-${primaryColorLevel}`;

        const controlProps = useMemo(() => {
            if (typeof groupValue !== "undefined") {
                return { checked: radioChecked };
            }
            return { checked: checkedProp, defaultChecked };
        }, [radioChecked, checkedProp, defaultChecked, groupValue]);

        const onRadioChange = useCallback(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (e: any) => {
                if (disabled || readOnly) {
                    return;
                }
                onGroupChange?.(value, e);
                onChange?.(value, e);
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [
                disabled,
                setRadioChecked,
                onChange,
                value,
                onGroupChange,
                groupValue,
                readOnly,
            ]
        );

        useEffect(() => {
            const propChecked = getChecked();
            if (radioChecked !== propChecked) {
                setRadioChecked(propChecked);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, checkedProp, groupValue]);

        const radioDefaultClass = useMemo(() => {
            return `radio text-${radioColor}`;
        }, [radioColor]);

        const radioColorClass = useMemo(() => {
            return disabled && "disabled";
        }, [disabled]);

        const labelDisabledClass = useMemo(() => {
            return disabled && "disabled";
        }, [disabled]);

        const radioClass = useMemo(() => {
            return classNames(radioDefaultClass, radioColorClass);
        }, [radioDefaultClass, radioColorClass]);

        const labelClass = useMemo(() => {
            return classNames(
                "radio-label",
                labelDisabledClass,
                className,
                "inline-flex",
                `${
                    radioGutter
                        ? "m" + (vertical ? "b-" : "r-") + radioGutter
                        : ""
                }`
            );
        }, [labelDisabledClass, className, radioGutter, vertical, radioGutter]);

        return (
            <label ref={labelRef} className={labelClass}>
                <input
                    ref={ref}
                    type="radio"
                    className={radioClass}
                    disabled={disabled}
                    value={value}
                    name={name}
                    readOnly={readOnly}
                    onChange={onRadioChange}
                    {...controlProps}
                    {...field}
                    {...rest}
                />
                {children ? (
                    <span
                        className={classNames(
                            "ml-2",
                            disabled ? "opacity-50" : ""
                        )}
                    >
                        {children}
                    </span>
                ) : null}
            </label>
        );
    })
);

export default Radio;
