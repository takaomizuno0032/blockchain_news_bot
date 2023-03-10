require('dotenv').config();
const express = require('express');
const line = require("@line/bot-sdk");
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
        .then((result) => res.json(result))
        .catch((error) => console.log(error));
});

const client = new line.Client(config);
const line_controller = new LineController(client);
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
    if (event.message.text == "news") {
        console.log("message: ", event.message);
        return line_controller.sendTopNews(event.replyToken);
    }

    if (event.message.text == "headline") {
        console.log("message: ", event.message);
        return line_controller.sendHeadlines(event.replyToken);
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'enjoy blockchain!'
    });

}

app.listen(PORT);