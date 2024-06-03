import { useCallback, useMemo } from "react";
import { HiCheck } from "react-icons/hi";
import { ControlProps, OptionProps, components } from "react-select";
import Select from "@libs/components/ui/Select";
import { useGetAllCountriesQuery } from "../../service";
import { ICountryOption } from "../../interface";

const { Control } = components;

const CustomSelectOption = ({
  innerProps,
  label,
  data,
  isSelected,
}: OptionProps<ICountryOption>) => {
  return (
    <div
      className={`flex items-center justify-between p-2 ${
        isSelected
          ? "bg-gray-100 dark:bg-gray-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-600"
      }`}
      {...innerProps}
    >
      <div className="flex items-center gap-3">
        <img className="w-[1.5rem]" src={data.flag} alt="flag" />
        <span>{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const CustomControl = ({
  children,
  ...props
}: ControlProps<ICountryOption>) => {
  const selected = props.getValue()[0];

  return (
    <Control {...props} className="pl-2">
      {selected && (
        <img className="w-[1.5rem]" src={selected.flag} alt="flag" />
      )}
      {children}
    </Control>
  );
};

interface ICountryDropdown {
  onSelectCountry?: (country: string) => void;
}

export default function CountryDropdown(props: ICountryDropdown) {
  const { onSelectCountry } = props;
  const { data: countries, isFetching: fetchingCountry } =
    useGetAllCountriesQuery("");

  const countryOptions: ICountryOption[] = useMemo(() => {
    if (countries) {
      const _data: ICountryOption[] = countries?.response.map((item) => ({
        label: item.name,
        value: item.name,
        flag: item.flag,
      }));
      return _data;
    }
    return [];
  }, [countries]);

  const handleSelectCountry = useCallback(
    (value: string) => {
      onSelectCountry?.(value);
    },
    [onSelectCountry]
  );

  return (
    <Select
      className="w-[10rem]"
      options={countryOptions}
      onChange={(opt) => handleSelectCountry((opt as ICountryOption).value)}
      isDisabled={fetchingCountry}
      components={{
        Option: CustomSelectOption,
        Control: CustomControl,
      }}
    />
  );
}
