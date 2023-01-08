import './App.css';
import NewsComponent from './componets/NewsComponent';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './componets/Navbar';
import ThemesComponent from './componets/Themes';
import { getThemes } from './api/getTheme';

function App() {
  getThemes();

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
