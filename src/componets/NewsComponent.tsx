import { getNews } from "../api/newsApi";
import {  RootState, store, setNews } from "../store/store";
import { newsType, ThemeType } from "../store/types";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "./Loading";
import ReactPullToRefresh from 'react-pull-to-refresh';
import { nanoid } from "nanoid";

function NewsComponent():JSX.Element
{
    const [fetching, setFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);


    //первичное занесение данных новостей
    useEffect(() => {
            setLoading(true);
            const news = getNews(currentPage);
            news.then((res) => {
                dispatch(setNews(res?.data))               
            })
            .finally(() => {
                setLoading(false);
            })       

        //привзяска слушателя событий на скролл страницы
        document.addEventListener('scroll', scrollHandler)
        return function (){
            document.removeEventListener('scroll', scrollHandler)
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        const news = store.getState().newsReducer.news;
        if(fetching){            
            const newsForOnePage = getNews(currentPage);
            newsForOnePage.then((res) => {
                dispatch(setNews([...news, ...res?.data]))
                setCurrentPage(currentPage + 1)                
            })
            .finally(() => {
                setFetching(false);
            }) 
        }              
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching]);

    const scrollHandler = (e : any) => {
        const visibilityPage = e.target.documentElement.scrollTop;
        const pageHeightWithScroll = e.target.documentElement.scrollHeight;
        const distanceFromTop = window.innerHeight; 
        
        //условие срабатывает, когда пользователь приближается к нижней части страницы
        if(pageHeightWithScroll - (visibilityPage + distanceFromTop) < 100)
            setFetching(true);        
    }    

    //получение новостей по запросу с сервера и занесение их в store, 
    // после достижения конца страницы
        const handleRefresh = async () => {
        setLoading(true);
        setCurrentPage(1)
        const news =  getNews(currentPage);
        await news.then((res) => {
            dispatch(setNews(res?.data))
            setLoading(false);
        });
      } ;

    //получение новостей из стора
    const tidings  = useSelector((state: RootState) => state.newsReducer.news);

    //получение текущей цветовой темы из стора
    const theme : ThemeType= useSelector((state : RootState) => state.themeReducer.currentTheme);
    const NewsComponent = () => {
        return(<>
                
                <div className="news-component">
                {
                    tidings.map((n : newsType) => {
                        return (
                            <div className='news-block' key={nanoid()} style={{ backgroundColor: theme.secondColor,}}>
                                <b style={{color: theme.mainColor}}>{n.title}</b>
                                <p className='news-content-block' style={{color: theme.textColor}}>{n.content}</p>            
                            </div>)
                    })
                }
                </div>
            </>) 
    };

    return (
    <>
        <Header title={'Новости'}/>
        <ReactPullToRefresh onRefresh={handleRefresh}>
            {!isLoading ? <NewsComponent/> 
                : <LoadingComponent/> } 
        </ReactPullToRefresh>
    </>)
}

export default NewsComponent;