const News = require('../news.js')
const NewsAPI = require('newsapi');
require('dotenv').config({ path: '../.env' });
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);


const moment = require('moment');

// get today's headline news of blockchain
export function getHeadlines() {
    newsapi.v2.topHeadlines({
        q: 'blockchain',
        language: 'en',
        category: 'business'
    }).then(res => {
        var articles = res.articles;
        var newsList = createNewsList(articles);
        console.log(newsList.length, " news fetched.");
        return newsList;
    }).catch(error => {
        console.log("api error...", error);
    })
}

// get top 5 today's news of blockchain 
export function getTopFiveNews() {
    today = moment(new Date()).format("YYYY-MM-DD");
    newsapi.v2.everything({
        q: 'blockchain',
        from: today,
        to: today,
        sortBy: 'popularity',
        page: 1,
        language: 'en'
    }).then(res => {
        // fix to get just top 5 through API if API specification is changed.
        var articles = res.articles;
        const COUNT = 5;
        var newsList = createNewsList(articles);
        var news;
        if (newsList.length >= COUNT) {
            news = newsList.splice(0, COUNT);
        } else {
            news = newsList.splice(0, newsList.length);
        }
        console.log(news.length, " top news fetched.");
        return news;
    }).catch(error => {
        console.log("error...", error);
    })
}

function createNewsList(articles) {
    var newsList = [];
    for (let i = 0; i < articles.length; i++) {
        var article = articles[i];
        var news = new News(article.title, article.description, article.url);
        newsList.push(news);
    }
    return newsList
}