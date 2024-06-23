import React, { createContext, useState, ReactNode } from 'react';
import { themeConfig } from "@config/theme.config";
import type {
    LayoutType,
    Mode,
    ColorLevel,
    Direction,
    NavMode,
} from "@app-core/@types/theme";
import { THEME_ENUM } from "@constant/theme.constant";

interface IThemeState {
    themeColor: string;
    direction: Direction;
    mode: Mode;
    primaryColorLevel: ColorLevel;
    layout: {
        type: LayoutType;
        sideNavCollapse: boolean;
        previousType?: LayoutType;
    };
    panelExpand: boolean;
    navMode: NavMode;
}

// Define the context value interface
interface IThemeContext {
    state: IThemeState;
    setDirection: (direction: Direction) => void;
    setMode: (mode: Mode) => void;
    setLayout: (layoutType: LayoutType) => void;
    setPreviousLayout: (previousLayout: LayoutType) => void;
    setSideNavCollapse: (collapse: boolean) => void;
    setThemeColor: (color: string) => void;
    setThemeColorLevel: (level: ColorLevel) => void;
    setPanelExpand: (expand: boolean) => void;
    setNavMode: (navMode: NavMode | 'default') => void;
}

// Create the initial state
const initialState: IThemeState = {
    themeColor: themeConfig.themeColor,
    direction: themeConfig.direction,
    mode: themeConfig.mode,
    primaryColorLevel: themeConfig.primaryColorLevel,
    layout: themeConfig.layout,
    panelExpand: themeConfig.panelExpand,
    navMode: themeConfig.navMode,
};

// Create the context
const ThemeContext = createContext<IThemeContext | undefined>(undefined);

// Create the provider component
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<IThemeState>(initialState);

    const setDirection = (direction: Direction) => setState(prev => ({ ...prev, direction }));
    const setMode = (mode: Mode) => setState(prev => ({ ...prev, mode }));
    const setLayout = (layoutType: LayoutType) => setState(prev => ({ ...prev, layout: { ...prev.layout, type: layoutType } }));
    const setPreviousLayout = (previousLayout: LayoutType) => setState(prev => ({ ...prev, layout: { ...prev.layout, previousType: previousLayout } }));
    const setSideNavCollapse = (collapse: boolean) => setState(prev => ({ ...prev, layout: { ...prev.layout, sideNavCollapse: collapse } }));
    const setThemeColor = (color: string) => setState(prev => ({ ...prev, themeColor: color }));
    const setThemeColorLevel = (level: ColorLevel) => setState(prev => ({ ...prev, primaryColorLevel: level }));
    const setPanelExpand = (expand: boolean) => setState(prev => ({ ...prev, panelExpand: expand }));
    const setNavMode = (navMode: NavMode | 'default') => setState(prev => ({
        ...prev,
        navMode: navMode !== 'default'
            ? navMode
            : (prev.mode === THEME_ENUM.MODE_LIGHT ? THEME_ENUM.NAV_MODE_LIGHT : THEME_ENUM.NAV_MODE_DARK),
    }));

    return (
        <ThemeContext.Provider value={{
            state,
            setDirection,
            setMode,
            setLayout,
            setPreviousLayout,
            setSideNavCollapse,
            setThemeColor,
            setThemeColorLevel,
            setPanelExpand,
            setNavMode
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
