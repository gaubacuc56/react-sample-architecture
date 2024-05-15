import type { CommonProps } from "@app-core/@types/common";
import { useAppDispatch } from "@app-core/redux-manager/method";

import withHeaderItem from "@libs/utils/hoc/withHeaderItem";
import { setSideNavCollapse } from "@libs/features/store";
import useResponsive from "@libs/hooks/useResponsive";
import NavToggle from "@libs/components/shared/NavToggle";
import { useThemeConfig } from "@libs/hooks/useThemeConfig";

const _SideNavToggle = ({ className }: CommonProps) => {
	const { layout } = useThemeConfig();

	const sideNavCollapse = layout.sideNavCollapse;

	const dispatch = useAppDispatch();

	const { larger } = useResponsive();

	const onCollapse = () => {
		dispatch(setSideNavCollapse(!sideNavCollapse));
	};

	return (
		<>
			{larger.md && (
				<div className={className} onClick={onCollapse}>
					<NavToggle className="text-2xl" toggled={sideNavCollapse} />
				</div>
			)}
		</>
	);
};

const SideNavToggle = withHeaderItem(_SideNavToggle);

export default SideNavToggle;
