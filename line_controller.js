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
        var messages = [];
        var sendMessage = async (client, replyToken) => {
            const newsList = await newsApi.getHeadlines();
            console.log("newsList: ", newsList);
            for (let i = 0; i < newsList?.length; i++) {
                messages = this.createMessage(newsList[i], messages);
            }
            if (messages.length = 0) {
                var content = {
                    type: 'text',
                    text: 'no news'
                }
                messages.push(content);
            }

            client.replyMessage(replyToken, messages);
        }
        sendMessage(this.client, replyToken);
    }

    createMessage(news, messages) {
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
        return messages;
    }
}

module.exports = LineController;