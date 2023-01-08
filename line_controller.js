require('dotenv').config();
const NewsApi = require('./api/news_api_controller.js')

class LineController {
    constructor(client) {
        this.client = client;
    }

    getTopNews(event) {
        var newsApi = new NewsApi();
        var messages = [];
        var get = async (client, event) => {
            const news = await newsApi.getPoluparNews();
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
            console.log(messages);
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: messages
            });

        }
        get(this.client, event);
    }

    // pushNews(client) {
    //     var newsApi = new NewsApi();
    //     var messages = [];
    //     var reply = async () => {
    //         const news = await newsApi.getPoluparNews();
    //         var title = {
    //             type: 'text',
    //             text: "Titile: " + news.title
    //         }
    //         var description = {
    //             type: 'text',
    //             text: "Description: " + news.description
    //         }
    //         var url = {
    //             type: 'text',
    //             text: news.url
    //         }
    //         messages.push(title);
    //         messages.push(description)
    //         messages.push(url);

    //         client.pushMessage("Ud3d86cb084fe75dcef808c1cceb7c025", messages
    //         ).then(() => console.log("success")).catch(err => console.log(err));

    //     }
    //     reply();
    // }
}

module.exports = LineController;