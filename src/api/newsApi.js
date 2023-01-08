
import axios from 'axios';



export async function getNews(page) {    
    try{
        const NEWS_API_URL = `https://frontappapi.dock7.66bit.ru/api/news/get?page=${page}&count=10`;
        return axios.get(NEWS_API_URL);

    }catch(e){
        console.error(e)
    }
}