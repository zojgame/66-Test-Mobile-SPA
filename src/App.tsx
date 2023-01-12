import './App.css';
import NewsComponent from './componets/NewsComponent';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './componets/Navbar';
import ThemesComponent from './componets/Themes';
import { getThemes } from './api/getTheme';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, RootState } from './store/store';
import { ThemeType } from './store/types';

function App() {
  getThemes();
  const dispatch = useDispatch();
    const darkTheme : ThemeType= useSelector((state : RootState) => state.themeReducer.darkTheme);
    const blueTheme : ThemeType= useSelector((state : RootState) => state.themeReducer.blueTheme);
    const prevTheme = localStorage.getItem('theme');

    if(prevTheme !== null){
      if(prevTheme === 'dark'){
        dispatch(setTheme(darkTheme));
      }
      if(prevTheme === 'blue'){
        dispatch(setTheme(blueTheme));
      }
    }

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route path='/' element={<NewsComponent/>}/>
        <Route path='themes' element={<ThemesComponent/>}/>
      </Route>
    </Routes>    
    </BrowserRouter>
  );
}

export default App;
