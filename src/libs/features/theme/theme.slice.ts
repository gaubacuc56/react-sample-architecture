import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { themeConfig } from '@app-core/theme/config'
import type {
    LayoutType,
    Mode,
    ColorLevel,
    Direction,
} from '@app-core/@types/theme'

interface IThemeState  {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
        previousType?: LayoutType
    },
    panelExpand: boolean
}

const initialState: IThemeState = {
    themeColor: themeConfig.themeColor,
    direction: themeConfig.direction,
    mode: themeConfig.mode,
    primaryColorLevel: themeConfig.primaryColorLevel,
    layout: themeConfig.layout,
    panelExpand: themeConfig.panelExpand,
}

export const themeStore = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setDirection: (state, action: PayloadAction<Direction>) => {
            state.direction = action.payload
        },
        setMode: (state, action: PayloadAction<Mode>) => {
            state.mode = action.payload
        },
        setLayout: (state, action: PayloadAction<LayoutType>) => {
            state.layout = {
                ...state.layout,
                ...{ type: action.payload },
            }
        },
        setPreviousLayout: (state, action) => {
            state.layout.previousType = action.payload
        },
        setSideNavCollapse: (state, action) => {
            state.layout = {
                ...state.layout,
                ...{ sideNavCollapse: action.payload },
            }
        },
        setThemeColor: (state, action: PayloadAction<string>) => {
            state.themeColor = action.payload
        },
        setThemeColorLevel: (state, action) => {
            state.primaryColorLevel = action.payload
        },
        setPanelExpand: (state, action: PayloadAction<boolean>) => {
            state.panelExpand = action.payload
        },
    },
})

// export action
export const {
    setDirection,
    setMode,
    setLayout,
    setSideNavCollapse,
    setThemeColor,
    setThemeColorLevel,
    setPreviousLayout,
    setPanelExpand,
} = themeStore.actions

export default themeStore.reducer
