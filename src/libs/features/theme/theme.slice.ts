import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { themeConfig } from '@app-core/theme/config'
import type {
    LayoutType,
    Mode,
    ColorLevel,
    Direction,
} from '@app-core/@types/theme'
import { RootState } from '@app-core/redux-manager/rootReducer'

interface IThemeState  {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
        previousType?: LayoutType
    }
}

const initialState: IThemeState = {
    themeColor: themeConfig.themeColor,
    direction: themeConfig.direction,
    mode: themeConfig.mode,
    primaryColorLevel: themeConfig.primaryColorLevel,
    layout: themeConfig.layout,
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
    },
})

// export state
export const themeColor = (state: RootState) => state.themeReducer.themeColor;
export const direction = (state: RootState) => state.themeReducer.direction;
export const mode = (state: RootState) => state.themeReducer.mode;
export const primaryColorLevel = (state: RootState) => state.themeReducer.primaryColorLevel;
export const layout = (state: RootState) => state.themeReducer.layout;

// export action
export const {
    setDirection,
    setMode,
    setLayout,
    setSideNavCollapse,
    setThemeColor,
    setThemeColorLevel,
    setPreviousLayout,
} = themeStore.actions

export default themeStore.reducer
