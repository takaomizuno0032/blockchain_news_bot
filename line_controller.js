require('dotenv').config();
const NewsApi = require('./api/news_api_controller.js')
const DeeplTranslator = require('./api/deepl_api_controller.js')

class LineController {
    constructor(client) {
        this.client = client;
        this.newsApi = new NewsApi();
        this.translator = new DeeplTranslator();
    }

    sendTopNews(replyToken) {
        var newsApi = new NewsApi();
        var messages = [];
        var sendMessage = async (client, newsApi, translator, replyToken) => {
            const news = await newsApi.getPoluparNews();
            console.log(news);
            if (news != undefined) {
                var jaTitle = await translator.translate(news.title, "en", "ja");
                var jaDes = await translator.translate(news.description, "en", "ja");
                var content = {
                    type: 'text',
                    text: "Title: " + news.title + "\n" + "日本語: " + jaTitle + "\n\n" + "Description: " + news.description + "\n" + "日本語: " + jaDes + "\n\n" + "URL: " + news.url
                }
                messages.push(content);
            } else {
                messages = [{
                    type: 'text',
                    text: 'no news'
                }]
            }

            client.replyMessage(replyToken, messages).then(() => {
                console.log("success");
            }
            ).catch((error) => {
                console.log("error: ", error);
            });

        }
        sendMessage(this.client, this.newsApi, this.translator, replyToken);
    }

    sendHeadlines(replyToken) {
        var newsApi = new NewsApi();
        var sendMessage = async (client, newsApi, translator, replyToken) => {
            const newsList = await newsApi.getHeadlines();
            const MAX_NEWS_NUM = 5;
            console.log("newsList: ", newsList);
            var messages = [];
            if (newsList != undefined & newsList?.length > 0) {
                for (let i = 0; i < newsList.length & i < MAX_NEWS_NUM; i++) {
                    var jaTitle = await translator.translate(news.title, "en", "ja");
                    var jaDes = await translator.translate(news.description, "en", "ja");
                    var content = {
                        type: 'text',
                        text: "Titile: " + newsList[i].title + "\n" + "日本語: " + jaTitle + "\n\n" + "Description: " + newsList[i].description + "\n" + "日本語: " + jaDes + "\n\n" + "URL: " + newsList[i].url
                    }
                    messages.push(content);
                }

            }
            else {
                var messages = [{
                    type: 'text',
                    text: 'no news'
                }]
            }
            client.replyMessage(replyToken, messages).then(() => {
                console.log("success");
            }
            ).catch((error) => {
                console.log("error: ", error);
            });

        }
        sendMessage(this.client, this.newsApi, this.translator, replyToken);
    }

    pushNews(userId) {
        var messages = [];
        var sendMessage = async (client, newsApi, translator, userId) => {
            const news = await newsApi.getPoluparNews();
            console.log(news);
            if (news != undefined) {

                var jaTitle = await translator.translate(news.title, "en", "ja");
                var jaDes = await translator.translate(news.description, "en", "ja");

                var content = {
                    type: 'text',
                    text: "Title: " + news.title + "\n" + "日本語: " + jaTitle + "\n\n" + "Description: " + news.description + "\n" + "日本語: " + jaDes + "\n\n" + "URL: " + news.url
                }
                messages.push(content);
            } else {
                messages = [{
                    type: 'text',
                    text: 'no news'
                }]
            }

            client.pushMessage(userId, messages).then(() => {
                console.log("success");
            }
            ).catch((error) => {
                console.log("error: ", error);
            });

        }
        sendMessage(this.client, this.newsApi, this.translator, userId);
    }
}

module.exports = LineController;