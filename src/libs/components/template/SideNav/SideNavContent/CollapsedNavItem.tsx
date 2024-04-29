import { useNavigate } from "react-router-dom";

import Menu from "@libs/components/ui/Menu";
import Dropdown from "@libs/components/ui/Dropdown";

import { Trans } from "react-i18next";
import type { CommonProps } from "@app-core/@types/common";
import type { Direction } from "@app-core/@types/theme";
import type { NavigationTree } from "@app-core/@types/navigation";
import { withAuthorization } from "@/libs/utils/hoc/withAuthorization";
import { useCallback, useMemo } from "react";
import { useAppDispatch } from "@/app-core/redux-manager/hooks";
import { setCurrentRouteKey } from "@/libs/features/route/route.slice";

interface DefaultItemProps extends CommonProps {
    nav: NavigationTree;
    onLinkClick?: (link: { key: string; title: string; path: string }) => void;
    userAuthority: string[];
}

interface CollapsedItemProps extends DefaultItemProps {
    direction: Direction;
}

interface CollapsedNavItemProps extends CollapsedItemProps {
    sideCollapsed?: boolean;
}

const MenuCollapse = withAuthorization(Menu.MenuCollapse);
const MenuItem = withAuthorization(Menu.MenuItem);
const DropdownWithAuthorized = withAuthorization(Dropdown);
const DropdownItem = withAuthorization(Dropdown.Item);

const DefaultItem = ({ nav, onLinkClick }: DefaultItemProps) => {
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

    return (
        <MenuCollapse
            authorities={nav.authority}
            key={nav.key}
            label={
                <>
                    <span className={`text-2xl mr-2`}>{nav.icon}</span>
                    <span>
                        <Trans
                            i18nKey={nav.translateKey}
                            defaults={nav.title}
                        />
                    </span>
                </>
            }
            eventKey={nav.key}
            expanded={false}
            className="mb-2"
        >
            {nav.subMenu.map((subNav) => (
                <MenuItem eventKey={subNav.key} authorities={subNav.authority}>
                    {subNav.path ? (
                        <div
                            className="h-full w-full flex items-center pl-8"
                            onClick={() => handleNavItemClick(subNav)}
                        >
                            <p className="w-full break-all">
                                <Trans
                                    i18nKey={subNav.translateKey}
                                    defaults={subNav.title}
                                />
                            </p>
                        </div>
                    ) : (
                        <p className="w-full break-all">
                            <Trans
                                i18nKey={subNav.translateKey}
                                defaults={subNav.title}
                            />
                        </p>
                    )}
                </MenuItem>
            ))}
        </MenuCollapse>
    );
};

const CollapsedItem = ({ nav, onLinkClick, direction }: CollapsedItemProps) => {
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

    const menuItem = useMemo(() => {
        return (
            <MenuItem
                authorities={[]}
                key={nav.key}
                eventKey={nav.key}
                className="mb-2"
            >
                <span className={`text-2xl mr-2`}>{nav.icon}</span>
            </MenuItem>
        );
    }, [nav.icon, nav.key]);

    return (
        <DropdownWithAuthorized
            authorities={nav.authority}
            trigger="hover"
            renderTitle={menuItem}
            placement={
                direction === "rtl" ? "middle-end-top" : "middle-start-top"
            }
        >
            {nav.subMenu.map((subNav) => (
                <DropdownItem authorities={nav.authority} eventKey={subNav.key}>
                    {subNav.path ? (
                        <div
                            className="h-full w-full flex items-center pl-8"
                            onClick={() => handleNavItemClick(subNav)}
                        >
                            <p className="w-full break-all">
                                <Trans
                                    i18nKey={subNav.translateKey}
                                    defaults={subNav.title}
                                />
                            </p>
                        </div>
                    ) : (
                        <p className="w-full break-all">
                            <Trans
                                i18nKey={subNav.translateKey}
                                defaults={subNav.title}
                            />
                        </p>
                    )}
                </DropdownItem>
            ))}
        </DropdownWithAuthorized>
    );
};

const CollapsedNavItem = ({
    sideCollapsed,
    ...rest
}: CollapsedNavItemProps) => {
    return sideCollapsed ? (
        <CollapsedItem {...rest} />
    ) : (
        <DefaultItem {...rest} />
    );
};

export default CollapsedNavItem;
