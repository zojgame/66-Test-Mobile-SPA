import axios from "axios";
import { store, setBlueTheme, setDarkTheme, setLightTheme } from "../store/store";

const DARK_THEME_API_URL = 'https://frontappapi.dock7.66bit.ru/api/theme/get?name=dark';
const LIGHT_THEME_API_URL = 'https://frontappapi.dock7.66bit.ru/api/theme/get?name=light';
const BLUE_THEME_API_URL = 'https://frontappapi.dock7.66bit.ru/api/theme/get?name=blue';

export async function getThemes() {
    try{
        axios.get(`${DARK_THEME_API_URL}`)
        .then((req) => {
            store.dispatch(setDarkTheme(req.data))
        })
        axios.get(`${LIGHT_THEME_API_URL}`)
        .then((req) => {
            store.dispatch(setLightTheme(req.data))
        })
        axios.get(`${BLUE_THEME_API_URL}`)
        .then((req) => {
            store.dispatch(setBlueTheme(req.data))
        })
    }
    catch(e){
        console.error(e)
    }
    return undefined;
}