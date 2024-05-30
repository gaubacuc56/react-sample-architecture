import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiWorld } from "react-icons/bi";
import { PagePortal } from "@libs/components/template/PageHeaderPortal";
import Select, { ISelectOption } from "@libs/components/ui/Select";
import DataTable from "@libs/components/shared/DataTable";
import { DebounceInput } from "@libs/components/shared/DebounceInput";
import { ColumnDef } from "@libs/components/shared/DataTable";
import Tooltip from "@libs/components/ui/Tooltip";
import Avatar from "@libs/components/ui/Avatar";
import { ILeague } from "@libs/features/soccer/league/interface";
import { useGetAllLeaguesQuery } from "@libs/features/services";
import { ISearchLeagueRequest } from "@libs/dtos/request/soccer/leauge.request";
import { removeAttribute } from "@libs/utils/helper/removeAttribute";
import { toQueryString } from "@libs/utils/helper/toQueryString";

export default function LeagueList() {
	const [filter, setFilter] = useState<ISearchLeagueRequest>({ type: "cup" });
	const [query, setQuery] = useState(toQueryString(filter));
	// const { data, refetch, isFetching } = useGetAllLeaguesQuery(query);

	// useEffect(() => {
	// 	refetch();
	// }, [refetch, query]);

	const executeQuery = (
		currFilter: ISearchLeagueRequest,
		keyToKeep: keyof ISearchLeagueRequest
	) => {
		const filter = removeAttribute(currFilter, [keyToKeep]);
		setFilter(filter);
		setQuery(toQueryString(filter));
	};

	const handleSelectType = (value: string | undefined) => {
		const currFilter = filter;
		currFilter.type = value as "cup" | "league";
		executeQuery(currFilter, "type");
	};

	const handleSearch = (value: string | number) => {
		if (value) {
			const currFilter = filter;
			currFilter.search = value as string;
			executeQuery(currFilter, "search");
		}
	};

	const columns: ColumnDef<ILeague>[] = useMemo(() => {
		return [
			{ id: "id", accessorKey: "id" },
			{
				id: "name",
				header: "name",
				cell: ({ row }) => {
					return (
						<div className="flex items-center gap-3">
							<img
								src={row.original.logo}
								className="w-[2rem]"
								alt="Logo"
							/>
							<span className="font-semibold">
								{row.original.name}
							</span>
						</div>
					);
				},
			},
			{ id: "type", accessorKey: "type" },
			{
				id: "country",
				header: "country",
				cell: ({ row }) => {
					return (
						<Tooltip
							title={row.original.country_name}
							wrapperClass="cursor-pointer"
						>
							{row.original.country_name == "World" ? (
								<BiWorld fontSize="1.5rem" />
							) : row.original.country_flag ? (
								<Avatar
									src={row.original.country_flag}
									shape="square"
									className="!w-[3rem] !h-[2rem]"
								/>
							) : (
								"NaN"
							)}
						</Tooltip>
					);
				},
			},
		];
	}, []);

	const leagueTypesOptions: ISelectOption[] = useMemo(() => {
		return [
			{ label: "Cup", value: "cup" },
			{ label: "League", value: "league" },
		];
	}, []);

	const mappedData = useMemo(() => {
		// if (data) {
		// 	const _data: ILeague[] = data?.response.map((item) => ({
		// 		id: item.league.id,
		// 		name: item.league.name,
		// 		type: item.league.type,

		// 		logo: item.league.logo,
		// 		country_name: item.country.name,
		// 		country_flag: item.country.flag,
		// 	}));
		// 	return _data;
		// }

		return [
			{
				id: 1,
				name: "Euro Championship",
				type: "Cup",
				logo: "https://media.api-sports.io/football/leagues/4.png",
				country_name: "World",
				country_flag: null,
			},
			{
				id: 2,
				name: "Premier League",
				type: "League",
				logo: "https://media.api-sports.io/football/leagues/39.png",
				country_name: "England",
				country_flag: "https://media.api-sports.io/flags/gb.svg",
			},
		];
	}, []);

	const pagingData = useMemo(() => {
		// if (data) {
		// 	return {
		// 		total: data?.paging.total,
		// 		pageIndex: data?.paging.current,
		// 		pageSize: 100,
		// 	};
		// }
		return {
			total: 100,
			pageIndex: 1,
			pageSize: 50,
		};
	}, []);

	return (
		<div>
			<PagePortal container="page-header">
				<div className="flex items-center gap-3">
					<DebounceInput
						value=""
						type="text"
						onChange={handleSearch}
						placeholder="Search by name or country"
						extra="min-w-[15rem]"
						leftIcon={<FiSearch />}
					/>

					<Select
						className="w-[8rem]"
						options={leagueTypesOptions}
						onChange={(opt) => handleSelectType(opt?.value)}
						value={leagueTypesOptions.filter(
							(type) => type.value === filter.type
						)}
						// isDisabled={isFetching}
					/>
				</div>
			</PagePortal>
			<div className="mt-5">
				<DataTable
					columns={columns}
					data={mappedData}
					// loading={isFetching}
					pagingData={pagingData}
				/>
			</div>
		</div>
	);
}
