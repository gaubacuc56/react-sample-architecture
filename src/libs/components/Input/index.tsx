/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, forwardRef, useMemo } from "react";

interface InputProps {
  id?: string;
  extra?: string;
  placeholder?: string;
  state?: string;
  disabled?: boolean;
  type?: string;
  onChange?: any;
  onClick?: any;
  value?: string | number;
  /**
   * Display icon on the left input field
   */
  leftIcon?: React.ReactNode;
  /**
   * Display icon on the right input field
   */
  rightIcon?: React.ReactNode;
  /**
   * Custom style for the input
   */
  additionalInputStyle?: CSSProperties;
  /**
   * Input is readonly, can not be editable
   */
  readOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const {
      id,
      extra,
      type,
      placeholder,
      state,
      disabled,
      onChange,
      onClick,
      value,
      leftIcon,
      rightIcon,
      additionalInputStyle,
      readOnly = false
    } = props;

    const _inputClasses = useMemo(() => {
      let _extraClass: string;
      if (disabled !== true) {
        if (state === "error")
          _extraClass =
            "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400";
        else if (state === "success")
          _extraClass =
            "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400";
        else
          _extraClass = "border-gray-200 dark:!border-white/10 dark:text-white";
      } else
        _extraClass =
          "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]";

      let inputClasses = `mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${_extraClass}`;
      if (leftIcon) inputClasses += ` pl-[2.125rem]`;
      if (rightIcon) inputClasses += ` pr-[2.125rem]`;
      return inputClasses;
    }, [disabled, leftIcon, rightIcon, state]);

    const _iconClasses = useMemo(() => {
      let iconClasses = "";
      const classesArray = _inputClasses.split(/(\s+)/);
      //Except text size, get all classes related to text for icon, ex: text-color
      classesArray.forEach((item) => {
        if (item.includes("text") && item !== "text-sm")
          iconClasses += `${item} `;
      });
      return `${iconClasses} absolute inset-y-0 flex items-center`;
    }, [_inputClasses]);

    return (
      <div className={`${extra}`}>
        <div className="relative" onClick={onClick}>
          {leftIcon !== undefined ? (
            <span className={`${_iconClasses} left-0 pl-3`}>{leftIcon}</span>
          ) : (
            ""
          )}
          <input
            value={value}
            onChange={onChange}
            disabled={disabled}
            type={type}
            id={id}
            placeholder={placeholder}
            className={_inputClasses}
            style={additionalInputStyle}
            readOnly={readOnly}
            ref={ref}
          />
          {rightIcon !== undefined ? (
            <span className={`${_iconClasses} right-0 pr-3 cursor-pointer`}>
              {rightIcon}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
);

export default Input;
