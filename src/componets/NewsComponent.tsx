import { getNews } from "../api/newsApi";
import {  RootState, store } from "../store/store";
import { newsType } from "../store/types";
import { Header } from "./Header";
import { ThemeType } from '../store/types';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNews } from "../store/store";
import {useState} from 'react';
import LoadingComponent from "./Loading";
import ReactPullToRefresh from 'react-pull-to-refresh';
function NewsComponent():JSX.Element
{
    const [fetching, setFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
            setLoading(true);
            const news = getNews(currentPage);
            news.then((res) => {
                dispatch(setNews(res?.data))
                setCurrentPage(currentPage + 1)                
            })
            .finally(() => {
                setLoading(false);
            })       

        document.addEventListener('scroll', scrollHandler)
        return function (){
            document.removeEventListener('scroll', scrollHandler)
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        const news = store.getState().newsReducer.news;
        if(fetching){
            // setLoading(true);
            
            const newsForOnePage = getNews(currentPage);
            newsForOnePage.then((res) => {
                dispatch(setNews([...news, ...res?.data]))
                setCurrentPage(currentPage + 1)
                
            })
            .finally(() => {
                // setLoading(false);
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
        if(pageHeightWithScroll - (visibilityPage + distanceFromTop) < 100){
            console.log('scroll');
            setFetching(true);
        }
    }

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false)
    //получение новостей по запросу с сервера и занесение их в store
    

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
                            <div className='news-block' key={n.id} style={{ backgroundColor: theme.secondColor,}}>
                                <b style={{color: theme.mainColor}}>{n.title}</b>
                                <p className='news-content-block' style={{color: theme.textColor}}>{n.content}</p>            
                            </div>)
                    })
                }
                </div>
            </>) 
    };

    const ResultComponent = () => {
        return(!isLoading ? <NewsComponent/> 
        : <LoadingComponent/>) 
    };

    return (
    <>
        <Header title={'Новости'}/>
    <ReactPullToRefresh onRefresh={handleRefresh}>
        <ResultComponent/>  
    </ReactPullToRefresh>
    </>)
}

export default NewsComponent;