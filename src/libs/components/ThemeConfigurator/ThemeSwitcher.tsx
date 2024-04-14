import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import Select from "../Select";
import Badge from "../Badge";
import {
    setThemeColor,
    setThemeColorLevel,
    themeColor as appThemeColor,
    primaryColorLevel as appPrimaryColorLevel,
} from "@libs/features/theme/theme.slice";
import { HiCheck } from "react-icons/hi";
import { components } from "react-select";
import type { ColorLevel } from "@app-core/@types/theme";
import type { ControlProps, OptionProps } from "react-select";

const { Control } = components;

type ColorList = {
    label: string;
    value: string;
};

type ColorLevelList = {
    label: string;
    value: ColorLevel;
};

const colorList: ColorList[] = [
    { label: "Red", value: "red" },
    { label: "Orange", value: "orange" },
    { label: "Amber", value: "amber" },
    { label: "Yellow", value: "yellow" },
    { label: "Lime", value: "lime" },
    { label: "Green", value: "green" },
    { label: "Emerald", value: "emerald" },
    { label: "Teal", value: "teal" },
    { label: "Cyan", value: "cyan" },
    { label: "Sky", value: "sky" },
    { label: "Blue", value: "blue" },
    { label: "Indigo", value: "indigo" },
    { label: "Violet", value: "violet" },
    { label: "Purple", value: "purple" },
    { label: "Fuchsia", value: "fuchsia" },
    { label: "Pink", value: "pink" },
    { label: "Rose", value: "rose" },
];

const colorLevelList: ColorLevelList[] = [
    { label: "400", value: 400 },
    { label: "500", value: 500 },
    { label: "600", value: 600 },
    { label: "700", value: 700 },
    { label: "800", value: 800 },
    { label: "900", value: 900 },
];

const ColorBadge = ({
    className,
    themeColor,
}: {
    className?: string;
    themeColor: string;
}) => {
    const primaryColorLevel = useSelector(appPrimaryColorLevel);

    return (
        <Badge
            className={className}
            innerClass={`bg-${themeColor}-${primaryColorLevel}`}
        />
    );
};

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<ColorList>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? "bg-gray-100 dark:bg-gray-500"
                    : "hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <ColorBadge themeColor={data.value} />
                <span>{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    );
};

const CustomControl = ({ children, ...props }: ControlProps<ColorList>) => {
    const selected = props.getValue()[0];

    const themeColor = useSelector(appThemeColor);

    return (
        <Control {...props}>
            {selected && (
                <ColorBadge
                    themeColor={themeColor}
                    className="ltr:ml-4 rtl:mr-4"
                />
            )}
            {children}
        </Control>
    );
};

const ThemeSwitcher = () => {
    const dispatch = useDispatch();

    const themeColor = useSelector(appThemeColor);
    const primaryColorLevel = useSelector(appPrimaryColorLevel);

    const onThemeColorChange = ({ value }: ColorList) => {
        dispatch(setThemeColor(value));
    };

    const onThemeColorLevelChange = ({ value }: ColorLevelList) => {
        dispatch(setThemeColorLevel(value));
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <Select
                size="sm"
                options={colorList}
                components={{
                    Option: CustomSelectOption,
                    Control: CustomControl,
                }}
                value={colorList.filter((color) => color.value === themeColor)}
                onChange={(opt) => onThemeColorChange(opt as ColorList)}
                className="pl-2"
            />
            <Select
                size="sm"
                options={colorLevelList}
                value={colorLevelList.filter(
                    (color) => color.value === primaryColorLevel
                )}
                onChange={(opt) =>
                    onThemeColorLevelChange(opt as ColorLevelList)
                }
            />
        </div>
    );
};

export default ThemeSwitcher;
