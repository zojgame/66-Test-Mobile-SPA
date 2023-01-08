import {combineReducers, configureStore, createSlice} from '@reduxjs/toolkit';
import { ThemeType, StoreStateType } from './types';

//#region InitialState
const InitialThemeState : ThemeType = {
    id: 2,
    name: 'light', 
    mainColor: 'rgb(206, 240, 227)',
    secondColor: 'rgb(255, 255, 255)',
    title: 'Светлая тема',
    textColor: 'rgb(10, 10, 10)'
}

const initialState : StoreStateType = {
    news: [],
    currentTheme: InitialThemeState,
    darkTheme: InitialThemeState,
    lightTheme: InitialThemeState,
    blueTheme: InitialThemeState,
}
// #endregion

//#region Reducers
const newsReducer = createSlice({
    name: 'newsReducer',
    initialState,
    reducers : {
        setNews: (state, action) => {
            state.news = action.payload;
        }
    }
});

const themeReducer = createSlice({
    name: 'themeReducer',
    initialState,
    reducers : {
        setTheme: (state, action) => {
            state.currentTheme = action.payload;
        },
        setDarkTheme: (state, action) => {
            state.darkTheme = action.payload
        },
        setLightTheme: (state, action) => {
            state.lightTheme = action.payload
        },
        setBlueTheme: (state, action) => {
            state.blueTheme = action.payload
        },
    }
});

export const rootReducer = combineReducers({
    'newsReducer' : newsReducer.reducer,
    'themeReducer': themeReducer.reducer
})
//#endregion

//#region Exports
export const {setNews} = newsReducer.actions;
export const {setTheme, setDarkTheme, setLightTheme, setBlueTheme} = themeReducer.actions;

export const store = configureStore({reducer :rootReducer});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//#endregion