
import axios from 'axios';
import { store, setNews } from '../store/store';

const NEWS_API_URL = 'https://frontappapi.dock7.66bit.ru/api/news/get?page=1&count=10'

export async function getNews() {
    
    try{
        axios.get(NEWS_API_URL)
            .then((res) => {
                store.dispatch(setNews(res.data))
            })

    }catch(e){
        console.error(e)
    }
}