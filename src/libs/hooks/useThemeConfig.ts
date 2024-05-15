import { useAppSelector } from "@app-core/redux-manager/method";

export const useThemeConfig = () => {
	const themeColor = useAppSelector((state) => state.themeReducer.themeColor);
	const direction = useAppSelector((state) => state.themeReducer.direction);
	const mode = useAppSelector((state) => state.themeReducer.mode);
	const primaryColorLevel = useAppSelector(
		(state) => state.themeReducer.primaryColorLevel
	);
	const layout = useAppSelector((state) => state.themeReducer.layout);
	const panelExpand = useAppSelector(
		(state) => state.themeReducer.panelExpand
	);
	const navMode = useAppSelector((state) => state.themeReducer.navMode);

	/**
	 * Storybook will not work with redux.
	 * At a specific site, use fixed config directly from the theme.config
	 */
	// import themeConfig from "@config/theme.config"
	// const themeColor = themeConfig.themeColor
	// const direction = themeConfig.direction
	// const mode = themeConfig.mode
	// const primaryColorLevel = themeConfig.primaryColorLevel
	// const layout = themeConfig.layout
	// const panelExpand = themeConfig.panelExpand
	// const navMode = themeConfig.navMode

	return {
		themeColor,
		primaryColorLevel,
		mode,
		direction,
		layout,
		panelExpand,
		navMode,
	};
};
