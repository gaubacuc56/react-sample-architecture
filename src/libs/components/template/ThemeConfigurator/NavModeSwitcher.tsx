import Radio from "@libs/components/ui/Radio";
import { useAppDispatch, useAppSelector } from "@app-core/redux-manager/method";
import { THEME_ENUM } from "@constant/theme.constant";
import { ThemeActions } from "@libs/features/store";

type NavModeParam = "default" | "themed";

const NavModeSwitcher = () => {
	const navMode = useAppSelector((state) => state.themeReducer.navMode);
	const dispatch = useAppDispatch();

	const onSetNavMode = (val: NavModeParam) => {
		dispatch(ThemeActions.setNavMode(val));
	};

	return (
		<Radio.Group
			value={
				navMode === THEME_ENUM.NAV_MODE_THEMED
					? THEME_ENUM.NAV_MODE_THEMED
					: "default"
			}
			onChange={onSetNavMode}
		>
			<Radio value="default">Default</Radio>
			<Radio value={THEME_ENUM.NAV_MODE_THEMED}>Themed</Radio>
		</Radio.Group>
	);
};

export default NavModeSwitcher;
