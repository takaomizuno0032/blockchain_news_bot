require('dotenv').config();
const NewsApi = require('./api/news_api_controller.js')

class LineController {
    constructor(client) {
        this.client = client;
    }

    getTopNews(replyToken) {
        var newsApi = new NewsApi();
        var messages = [];
        var sendMessage = async (client, replyToken) => {
            const news = await newsApi.getPoluparNews();
            messages = this.createMessage(news, messages);

            client.replyMessage(replyToken, messages);
        }
        sendMessage(this.client, replyToken);
    }

    getHeadlines(replyToken) {
        var newsApi = new NewsApi();
        var messages = [];
        var sendMessage = async (client, replyToken) => {
            const newsList = await newsApi.getHeadlines();

            for (let i = 0; i < newsLists.length; i++) {
                messages = this.createMessage(newsList[i], messages);
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