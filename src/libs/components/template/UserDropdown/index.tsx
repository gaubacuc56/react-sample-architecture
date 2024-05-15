import Avatar from "@libs/components/ui/Avatar";
import Dropdown from "@libs/components/ui/Dropdown";
import withHeaderItem from "@libs/utils/hoc/withHeaderItem";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import type { CommonProps } from "@app-core/@types/common";
import { useAppDispatch, useAppSelector } from "@app-core/redux-manager/method";
import { logout } from "@libs/features/auth/auth.slice";

type DropdownList = {
	label: string;
	path: string;
	icon: JSX.Element;
};

const dropdownItemList: DropdownList[] = [];

const _UserDropdown = ({ className }: CommonProps) => {
	const user = useAppSelector((state) => state.authReducer.savedAccount);

	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div>
			<Dropdown
				menuStyle={{ minWidth: 240 }}
				renderTitle={
					<div
						className={classNames(
							className,
							"flex items-center gap-2"
						)}
					>
						<Avatar
							size={32}
							shape="circle"
							icon={<HiOutlineUser />}
						/>
						<div className="hidden md:block">
							<div className="text-xs capitalize">admin</div>
							<div className="font-bold">{user?.username}</div>
						</div>
					</div>
				}
				placement="bottom-end"
			>
				<Dropdown.Item variant="header">
					<div className="py-2 px-3 flex items-center gap-2">
						<Avatar shape="circle" icon={<HiOutlineUser />} />
						<div>
							<div className="font-bold text-gray-900 dark:text-gray-100">
								{user?.username}
							</div>
							<div className="text-xs">
								{user?.username}@gmail.com
							</div>
						</div>
					</div>
				</Dropdown.Item>
				<Dropdown.Item variant="divider" />
				{dropdownItemList.map((item) => (
					<Dropdown.Item
						key={item.label}
						eventKey={item.label}
						className="mb-1 px-0"
					>
						<Link
							className="flex h-full w-full px-2"
							to={item.path}
						>
							<span className="flex gap-2 items-center w-full">
								<span className="text-xl opacity-50">
									{item.icon}
								</span>
								<span>{item.label}</span>
							</span>
						</Link>
					</Dropdown.Item>
				))}
				{/* <Dropdown.Item variant="divider" /> */}
				<Dropdown.Item
					eventKey="Sign Out"
					className="gap-2"
					onClick={handleLogout}
				>
					<span className="text-xl opacity-50">
						<HiOutlineLogout />
					</span>
					<span>Sign Out</span>
				</Dropdown.Item>
			</Dropdown>
		</div>
	);
};

const UserDropdown = withHeaderItem(_UserDropdown);

export default UserDropdown;
