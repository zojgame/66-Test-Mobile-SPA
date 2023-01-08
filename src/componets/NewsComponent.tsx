import { getNews } from "../api/newsApi";
import {  useSelector } from "react-redux";
import {  RootState } from "../store/store";
import { newsType } from "../store/types";
import { Header } from "./Header";
import { ThemeType } from '../store/types';

function NewsComponent():JSX.Element{
    //получение новостей по запросу с сервера и занесение их в store
    getNews();

    //получение новостей из стора
    const tidings  = useSelector((state: RootState) => state.newsReducer.news);

    //получение текущей цветовой темы из стора
    const theme : ThemeType= useSelector((state : RootState) => state.themeReducer.currentTheme);

    return (<>
        <Header title={'Новости'}/>
        <div className="news-component">
        {
            tidings.map((n : newsType) => {
                return (
                <div className='news-block' key={n.id} style={{ backgroundColor: theme.secondColor,}}>
                    <b style={{color: theme.mainColor}}>{n.title}</b>
                    <p className='news-content-block' style={{color: theme.textColor}}>{n.content}</p>            
                </div>)
            })
        }
        </div>
    </>);
}

export default NewsComponent;