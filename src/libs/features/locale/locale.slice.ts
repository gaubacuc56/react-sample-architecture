import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@app-core/redux-manager/rootReducer';
import { Locales, LocaleType } from '@app-core/locale';

// define state
interface ILocaleState {
    language : LocaleType,
}
const initialState: ILocaleState = {
    language: Locales.ENGLISH
};

// define slice
const localeStore = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        setAppLanguage: (state, action: PayloadAction<LocaleType>) => {
            state.language = action.payload;
        }
    },
});

// export state
export const appLanguage = (state: RootState) => state.localeReducer.language;

// export action
export const { setAppLanguage } = localeStore.actions;
export default localeStore.reducer;