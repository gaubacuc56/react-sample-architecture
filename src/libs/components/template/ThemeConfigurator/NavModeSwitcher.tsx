import Radio from "@libs/components/ui/Radio";
import { THEME_ENUM } from "@constant/theme.constant";
import { useTheme } from "@libs/hooks/useTheme";

type NavModeParam = "default" | "themed";

const NavModeSwitcher = () => {
    const { ThemeActions, navMode } = useTheme();

    const onSetNavMode = (val: NavModeParam) => {
        ThemeActions.setNavMode(val);
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
