require('dotenv').config();
const express = require('express');
const line = require("@line/bot-sdk");
const NewsApi = require('./api/news_api_controller.js');
const LineController = require('./line_controller.js');

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
    console.log(event.message);
    if (event.message.text == "news") {
        var line_controller = new LineController();
        line_controller.replyTopNews(client, event);
    }

}

app.listen(PORT);