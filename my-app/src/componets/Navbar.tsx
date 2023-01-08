import {Outlet,useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {IoMdColorPalette} from 'react-icons/io';
import {IoNewspaperOutline} from 'react-icons/io5';
import { RootState } from '../store/store';
import {useSelector} from 'react-redux'
import { ThemeType } from '../store/types';
import {useState} from 'react';

function Navbar():JSX.Element{
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState('/')
    const theme : ThemeType = useSelector((state : RootState) => state.themeReducer.currentTheme);

    const moveTo = (url: string) => {
        navigate(url);
        setCurrentPage(url);
    }

    return (<>
    <Outlet/>
    <Paper className='navbar' sx={{ background: theme.mainColor  }} component="footer" square variant="outlined">
        <div className='navbar-container'>
            <div></div>
            <div className='navbar-btn-container'>
                <div className='navbar-btn' onClick={() => moveTo('/')}>
                    <IoNewspaperOutline style={{color: currentPage === '/' 
                    ? theme.textColor : theme.secondColor, fontSize: 40}}/>
                </div>
                 <div className='navbar-btn' onClick={() => moveTo('themes')}>
                    <IoMdColorPalette style={{color: currentPage === 'themes' 
                    ? theme.textColor : theme.secondColor, fontSize: 40}}/>
                 </div>
            </div>
            <div></div>
        </div>

    </Paper>
    </>)

}

export default Navbar;