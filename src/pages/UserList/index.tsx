import Button from "@libs/components/ui/Button";
import { PagePortal } from "@/libs/components/template/PageHeaderPortal";
export default function UserList() {
    return (
        <PagePortal>
            <Button className="h-10 my-1 text-sm" variant="solid">
                Create
            </Button>
        </PagePortal>
    );
}
