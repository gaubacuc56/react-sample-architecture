import { useEffect } from "react";
import type { Mode } from "@app-core/@types/theme";
import { THEME_ENUM } from "@constant/theme.constant";

import { ThemeActions } from "@libs/features/store";
import { useAppSelector, useAppDispatch } from "@app-core/redux-manager/method";

function useDarkMode(): [
	isEnabled: boolean,
	onModeChange: (mode: Mode) => void,
] {
	const mode = useAppSelector((state) => state.themeReducer.mode);

	const { MODE_DARK, MODE_LIGHT } = THEME_ENUM;

	const isEnabled = mode === MODE_DARK;

	const dispatch = useAppDispatch();

	const onModeChange = (mode: Mode) => {
		dispatch(ThemeActions.setMode(mode));
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
