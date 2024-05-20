import { useAppSelector } from "@app-core/redux-manager/method";
import Progress from "../../ui/Progress";
import { AppCommonSelectors } from "@libs/features/store";

export default function FetchProgressBar() {
	const appIsFetching = useAppSelector(AppCommonSelectors.appIsFetching);
	return (
		<div>
			{appIsFetching && (
				<div className="w-screen fixed top-0 left-0 h-1 z-[9999]">
					<Progress isIndeterminate showInfo={false} />
				</div>
			)}
		</div>
	);
}
