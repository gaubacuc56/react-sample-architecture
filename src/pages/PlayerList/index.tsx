import React, { useMemo, useState } from "react";
import { useGetAllPlayersQuery } from "@libs/features/services";
import { ISearchPlayerRequest } from "@libs/dtos/request/soccer";
import { toQueryString } from "@libs/utils/helper/toQueryString";
import { DebounceInput } from "@libs/components/shared/DebounceInput";
import { FiSearch } from "react-icons/fi";
import { PagePortal } from "@libs/components/template/PageHeaderPortal";
import DataTable, { ColumnDef } from "@libs/components/shared/DataTable";
import { IPlayer } from "@libs/features/soccer/player/interface";
export default function PlayerList() {
	const [filter, setFilter] = useState<ISearchPlayerRequest>({ page: 1 });
	const [query, setQuery] = useState(toQueryString(filter));
	const { data, isFetching } = useGetAllPlayersQuery(query);

	const handleSearch = (value: string | number) => {
		if (value) {
			const currFilter = filter;
			currFilter.search = value as string;
			setFilter(filter);
			setQuery(toQueryString(filter));
		}
	};

	const columns: ColumnDef<IPlayer>[] = useMemo(() => {
		return [
			{ id: "id", accessorKey: "id" },
			{ id: "name", accessorKey: "name" },
		];
	}, []);

	const mappedData = useMemo(() => {
		if (data) {
			const _data: IPlayer[] = data?.response.map((item) => ({
				id: item.player.id,
				name: item.player.name,
			}));
			return _data;
		}
	}, [data]);

	const pagingData = useMemo(() => {
		if (data) {
			return {
				total: data?.paging.total,
				pageIndex: data?.paging.current,
				pageSize: 10,
			};
		}
	}, [data]);

	return (
		<div>
			<PagePortal container="page-header">
				<div className="flex items-center gap-3">
					<DebounceInput
						value=""
						type="text"
						onChange={handleSearch}
						placeholder="Search player by name"
						extra="min-w-[15rem]"
						leftIcon={<FiSearch />}
					/>
				</div>
			</PagePortal>
			<div className="mt-5">
				<DataTable
					columns={columns}
					data={mappedData}
					loading={isFetching}
					pagingData={pagingData}
				/>
			</div>
		</div>
	);
}
