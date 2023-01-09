require('dotenv').config();
const NewsApi = require('./api/news_api_controller.js')

class LineController {
    constructor(client) {
        this.client = client;
    }

    sendTopNews(replyToken) {
        var newsApi = new NewsApi();
        var messages = [];
        var sendMessage = async (client, replyToken) => {
            const news = await newsApi.getPoluparNews();
            console.log(news);
            if (news != undefined) {
                var content = {
                    type: 'text',
                    text: "Title: " + news.title + "\n\n" + "Description: " + news.description + "\n\n" + "URL: " + news.url
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
        sendMessage(this.client, replyToken);
    }

    sendHeadlines(replyToken) {
        var newsApi = new NewsApi();
        var sendMessage = async (client, replyToken) => {
            const newsList = await newsApi.getHeadlines();
            const MAX_NEWS_NUM = 5;
            console.log("newsList: ", newsList);
            var messages = [];
            if (newsList != undefined) {
                for (let i = 0; i < newsList.length & i < MAX_NEWS_NUM; i++) {

                    var content = {
                        type: 'text',
                        text: "Titile: " + newsList[i].title + "\n\n" + "Description: " + newsList[i].description + "\n\n" + "URL: " + newsList[i].url
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
        sendMessage(this.client, replyToken);
    }
}

module.exports = LineController;