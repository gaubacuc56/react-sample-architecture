import { useCallback, useMemo } from "react";
import { HiCheck } from "react-icons/hi";
import { ControlProps, OptionProps, components } from "react-select";
import Select from "@libs/components/ui/Select";
import { useGetAllTeamsQuery } from "../../service";
import { ITeamOption } from "../../interface";
import { ISearchTeamRequest } from "@libs/dtos/request/soccer";
import { toQueryString } from "@libs/utils/helper/common";

const { Control } = components;

const CustomSelectOption = ({
  innerProps,
  label,
  data,
  isSelected,
}: OptionProps<ITeamOption>) => {
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
        <img className="w-[1.5rem]" src={data.logo} alt="flag" />
        <span>{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const CustomControl = ({ children, ...props }: ControlProps<ITeamOption>) => {
  const selected = props.getValue()[0];

  return (
    <Control {...props} className="pl-2">
      {selected && (
        <img className="w-[1.5rem]" src={selected.logo} alt="flag" />
      )}
      {children}
    </Control>
  );
};

interface ITeamDropdown {
  onSelectTeam?: (team: number) => void;
  filter: ISearchTeamRequest;
}

export default function TeamDropdown(props: ITeamDropdown) {
  const { onSelectTeam, filter } = props;
  const { data: teams, isFetching: fetchingTeam } = useGetAllTeamsQuery(
    toQueryString(filter)
  );

  const teamOptions: ITeamOption[] = useMemo(() => {
    if (teams) {
      const _data: ITeamOption[] = teams?.response.map((item) => ({
        label: item.team.name,
        value: item.team.id,
        logo: item.team.logo,
      }));
      return _data;
    }
    return [];
  }, [teams]);

  const handleSelectTeam = useCallback(
    (value: number) => {
      onSelectTeam?.(value);
    },
    [onSelectTeam]
  );

  return (
    <Select
      className="w-[10rem]"
      options={teamOptions}
      onChange={(opt) => handleSelectTeam((opt as ITeamOption).value)}
      isDisabled={fetchingTeam}
      components={{
        Option: CustomSelectOption,
        Control: CustomControl,
      }}
    />
  );
}
