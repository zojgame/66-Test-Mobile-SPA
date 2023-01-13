import { AppBar, Toolbar} from '@mui/material';
import { Container } from '@mui/system';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import {useSelector} from 'react-redux';
import { RootState } from '../store/store';
import { ThemeType } from '../store/types';

type HeaderProps = {
    title: string
}

export function Header({title} : HeaderProps):JSX.Element{
    //получение текущей цветовой темы
    const theme : ThemeType = useSelector((state : RootState) =>  state.themeReducer.currentTheme)

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0});

    return(
    <>
        <Slide in={!trigger}>
            <AppBar sx={{background: theme.mainColor}}>
                <Container fixed>
                    <Toolbar className='header-toolbar'>
                    <p style={{color: theme.textColor}}>{title}</p>
                    </Toolbar>
                </Container>
            </AppBar>
        </Slide>
    </>)
}