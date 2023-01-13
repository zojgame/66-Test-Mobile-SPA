import './App.css';
import { getThemes } from './api/getTheme';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, RootState } from './store/store';
import { ThemeType } from './store/types';
import RouterComponent from './routes/RouterComponent';

function App() {
  getThemes();
  const dispatch = useDispatch();
    const darkTheme : ThemeType= useSelector((state : RootState) => state.themeReducer.darkTheme);
    const blueTheme : ThemeType= useSelector((state : RootState) => state.themeReducer.blueTheme);
    const prevTheme = localStorage.getItem('theme');

    //проверка на то: сохранена ли предыдущая тема в локальном хранилище
    if(prevTheme !== null){
      if(prevTheme === 'dark'){
        dispatch(setTheme(darkTheme));
      }
      if(prevTheme === 'blue'){
        dispatch(setTheme(blueTheme));
      }
    }

  return (
    <RouterComponent/>
  );
}

export default App;
