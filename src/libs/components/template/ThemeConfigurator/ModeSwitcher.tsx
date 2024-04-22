import { useCallback } from "react";
import useDarkMode from "@libs/hooks/useDarkmode";
import Switcher from "@libs/components/ui/Switcher";

const ModeSwitcher = () => {
    const [isDark, setIsDark] = useDarkMode();

    const onSwitchChange = useCallback(
        (checked: boolean) => {
            setIsDark(checked ? "dark" : "light");
        },
        [setIsDark]
    );

    return (
        <Switcher
            defaultChecked={isDark}
            onChange={(checked) => onSwitchChange(checked)}
        />
    );
};

export default ModeSwitcher;
