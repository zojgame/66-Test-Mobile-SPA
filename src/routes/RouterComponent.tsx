import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from '../componets/Navbar';
import NewsComponent from '../componets/NewsComponent';
import ThemesComponent from '../componets/Themes';
import { RouterProps } from './types';


const routes : RouterProps[] = [
    {path: '/',
    element: <NewsComponent/>,
    id: 1
},

    {path: 'themes',
    element: <ThemesComponent/>,
    id: 2
},
]


function RouterComponent() {
    return (
    <Router>
        <Routes>
            <Route path='/' element={<Navbar/>}>
                {routes.map((route) => 
                    <Route key={route.id} path={route.path} element={route.element}/>
                )}
            </Route>
        </Routes>    
    </Router>
    );
}

export default RouterComponent;