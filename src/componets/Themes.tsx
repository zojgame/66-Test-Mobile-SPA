import { RootState, setTheme } from "../store/store";
import { Header } from "./Header";
import { ThemeType } from '../store/types';
import {useSelector, useDispatch} from 'react-redux';

function ThemesComponent():JSX.Element{
    const dispatch = useDispatch();
    const darkTheme : ThemeType= useSelector((state : RootState) => state.themeReducer.darkTheme);
    const lightTheme : ThemeType= useSelector((state : RootState) => state.themeReducer.lightTheme);
    const blueTheme : ThemeType= useSelector((state : RootState) => state.themeReducer.blueTheme);

    const setThemeColor = (color: string) => {
        let theme = lightTheme;

        if(color === 'dark'){
            theme = darkTheme;
        }
        else if(color === 'blue'){
            theme = blueTheme;
        }
        dispatch(setTheme(theme));
    }
    return (
        <>
            <Header title={'Темы'}/>
            <div className="themes-buttons-container">
                <div></div>
                <div className="themes-buttons">
                    <div className="theme-btn theme1" onClick={() => setThemeColor('light')}>Тема 1</div>
                    <div className="theme-btn theme2" onClick={() => setThemeColor('blue')}>Тема 2</div>
                    <div className="theme-btn theme3" onClick={() => setThemeColor('dark')}>Тема 3</div>
                </div>
                <div></div>
            </div>
            
        </>
    )
}

export default ThemesComponent;