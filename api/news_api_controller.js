
const News = require('../news.js')
const NewsAPI = require('newsapi');
require('dotenv').config({ path: '../.env' });
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const moment = require('moment');

class NewsApi {
    // get today's headline news of blockchain
    async getHeadlines() {
        var newsList = [];
        await newsapi.v2.topHeadlines({
            q: 'blockchain',
            language: 'en',
            category: 'business'
        }).then(res => {
            var articles = res.articles;
            var newsList = this.createNewsList(articles);
            console.log(newsList.length, " news fetched.");
        }).catch(error => {
            console.log("api error...", error);
            throw error;
        })
        console.log("news return", newsList);
        return newsList;
    }

    // get top today's news of blockchain 
    async getPoluparNews() {
        var news;
        const today = moment(new Date()).format("YYYY-MM-DD");
        await newsapi.v2.everything({
            q: 'blockchain',
            from: today,
            to: today,
            sortBy: 'popularity',
            language: 'en'
        }).then(res => {
            var articles = res.articles;
            var newsList = this.createNewsList(articles);
            var randomIndex = Math.floor(Math.random() * newsList.length);
            news = newsList[randomIndex]
            console.log("top news fetched.");

        }).catch(error => {
            console.log("error...", error);
            throw error;
        })
        console.log("news return: ", news);
        return news;
    }

    createNewsList(articles) {
        var newsList = [];

        for (let i = 0; i < articles.length; i++) {
            var article = articles[i];
            var news = new News(article.title, article.description, article.url);
            newsList.push(news);
        }
        return newsList
    }
}

module.exports = NewsApi;