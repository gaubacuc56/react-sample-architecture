import { useNavigate } from "react-router-dom";

import type { CommonProps } from "@app-core/@types/common";
import type { Direction } from "@app-core/@types/theme";
import type { NavigationTree } from "@app-core/@types/navigation";
import useAuthority from "@libs/hooks/useAuthority";

import Tooltip from "@libs/components/ui/Tooltip";
import Menu from "@libs/components/ui/Menu";
import { Trans, useTranslation } from "react-i18next";
import { useAppDispatch } from "@/app-core/redux-manager/method";
import { setCurrentRouteKey } from "@/libs/features/app-common/app-common.slice";
import { useCallback } from "react";

const { MenuItem } = Menu;

interface CollapsedItemProps extends CommonProps {
	title: string;
	translateKey: string;
	direction?: Direction;
}

interface DefaultItemProps {
	nav: NavigationTree;
	onLinkClick?: (link: { key: string; title: string; path: string }) => void;
	sideCollapsed?: boolean;
	userAuthority: string[];
}

interface VerticalMenuItemProps extends CollapsedItemProps, DefaultItemProps {}

const CollapsedItem = ({
	title,
	translateKey,
	children,
	direction,
}: CollapsedItemProps) => {
	const { t } = useTranslation();

	return (
		<Tooltip
			title={t(translateKey) || title}
			placement={direction === "rtl" ? "left" : "right"}
		>
			{children}
		</Tooltip>
	);
};

const DefaultItem = (props: DefaultItemProps) => {
	const { nav, onLinkClick, sideCollapsed, userAuthority } = props;

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleNavItemClick = useCallback(
		(subNav: NavigationTree) => {
			dispatch(setCurrentRouteKey(subNav.path));
			onLinkClick?.({
				key: subNav.key,
				title: subNav.title,
				path: subNav.path,
			});
			navigate(subNav.path);
		},
		[dispatch, navigate, onLinkClick]
	);

	const isAuthorized = useAuthority(userAuthority, nav.authority);

	if (isAuthorized) {
		return (
			<MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
				<div
					className="flex items-center h-full w-full"
					onClick={() => handleNavItemClick(nav)}
				>
					<span className={`text-2xl mr-2`}>{nav.icon}</span>
					{!sideCollapsed && (
						<span>
							<Trans
								i18nKey={nav.translateKey}
								defaults={nav.title}
							/>
						</span>
					)}
				</div>
			</MenuItem>
		);
	}
};

const SingleNavItem = ({
	nav,
	onLinkClick,
	sideCollapsed,
	userAuthority,
	direction,
}: Omit<VerticalMenuItemProps, "title" | "translateKey">) => {
	const isAuthorized = useAuthority(userAuthority, nav.authority);
	if (isAuthorized) {
		return (
			<>
				{sideCollapsed ? (
					<CollapsedItem
						title={nav.title}
						translateKey={nav.translateKey}
						direction={direction}
					>
						<DefaultItem
							nav={nav}
							sideCollapsed={sideCollapsed}
							userAuthority={userAuthority}
							onLinkClick={onLinkClick}
						/>
					</CollapsedItem>
				) : (
					<DefaultItem
						nav={nav}
						sideCollapsed={sideCollapsed}
						userAuthority={userAuthority}
						onLinkClick={onLinkClick}
					/>
				)}
			</>
		);
	}
};

export default SingleNavItem;
