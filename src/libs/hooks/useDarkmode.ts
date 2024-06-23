import { useEffect } from "react";
import type { Mode } from "@app-core/@types/theme";
import { THEME_ENUM } from "@constant/theme.constant";
import { useTheme } from "./useTheme";

function useDarkMode(): [
    isEnabled: boolean,
    onModeChange: (mode: Mode) => void,
] {
    const { mode, ThemeActions } = useTheme();

    const { MODE_DARK, MODE_LIGHT } = THEME_ENUM;

    const isEnabled = mode === MODE_DARK;

    const onModeChange = (mode: Mode) => {
        ThemeActions.setMode(mode);
    };

    useEffect(() => {
        if (window === undefined) {
            return;
        }
        const root = window.document.documentElement;
        root.classList.remove(isEnabled ? MODE_LIGHT : MODE_DARK);
        root.classList.add(isEnabled ? MODE_DARK : MODE_LIGHT);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled]);

    return [isEnabled, onModeChange];
}

export default useDarkMode;
