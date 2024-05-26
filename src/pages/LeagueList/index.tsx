import Button from "@libs/components/ui/Button";
import { PagePortal } from "@libs/components/template/PageHeaderPortal";
import { useGetAllLeaguesQuery } from "@libs/features/services";
import { useEffect } from "react";
export default function LeagueList() {
    const { data, refetch } = useGetAllLeaguesQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <PagePortal>
            <Button className="h-10 my-1 text-sm" variant="solid">
                Create
            </Button>
        </PagePortal>
    );
}
