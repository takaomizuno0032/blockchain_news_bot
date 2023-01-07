require('dotenv').config();
const express = require('express');
const line = require("@line/bot-sdk")
const NewsApi = require('./api/news_api_controller.js')

const PORT = process.env.PORT || 3000;

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}

const app = express();
app.get('/', (req, res) => res.send("Hello World!"));
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    if (event.message.text == "news") {
        var newsApi = new NewsApi();
        var news = newsApi.getTopFiveNews();
        var messages = [];
        for (let i = 0; i < news.length; i++) {
            messages.push(news[i].title);
            messages.push(news[i].description);
            messages.push(news[i].url);
        }

        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: messages
        });
    }

}

app.listen(PORT);