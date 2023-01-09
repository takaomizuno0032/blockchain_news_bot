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
                var title = {
                    type: 'text',
                    text: "Titile: " + news.title
                }
                var description = {
                    type: 'text',
                    text: "Description: " + news.description
                }
                var url = {
                    type: 'text',
                    text: news.url
                }
                messages.push(title);
                messages.push(description)
                messages.push(url);
            } else {
                messages = [{
                    type: 'text',
                    text: 'no news'
                }]
            }

            client.replyMessage(replyToken, messages);
        }
        sendMessage(this.client, replyToken);
    }

    sendHeadlines(replyToken) {
        var newsApi = new NewsApi();
        var sendMessage = async (client, replyToken) => {
            const newsList = await newsApi.getHeadlines();
            console.log("newsList: ", newsList);
            var messages = [];
            if (newsList != undefined) {
                for (let i = 0; i < newsList.length; i++) {

                    var title = {
                        type: 'text',
                        text: "Titile: " + newsList[i].title
                    }
                    var description = {
                        type: 'text',
                        text: "Description: " + newsList[i].description
                    }
                    var url = {
                        type: 'text',
                        text: newsList[i].url
                    }
                    messages.push(title);
                    messages.push(description)
                    messages.push(url);
                }

            }
            else {
                var messages = [{
                    type: 'text',
                    text: 'no news'
                }]
            }
            client.replyMessage(replyToken, messages);

        }
        sendMessage(this.client, replyToken);
    }
}

module.exports = LineController;