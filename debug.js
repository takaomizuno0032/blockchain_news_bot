require('dotenv').config();
const line = require("@line/bot-sdk")
const LineController = require('./line_controller.js');
const NewsApi = require('./api/news_api_controller.js');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}
const client = new line.Client(config);
const line_controller = new LineController(client);
const message = line_controller.getTopNews();


// var newsApi = new NewsApi();
// var messages = [];
// var pushNews = async () => {
//     const news = await newsApi.getPoluparNews();
//     var title = {
//         type: 'text',
//         text: "Titile: " + news.title
//     }
//     var description = {
//         type: 'text',
//         text: "Description: " + news.description
//     }
//     var url = {
//         type: 'text',
//         text: news.url
//     }
//     messages.push(title);
//     messages.push(description)
//     messages.push(url);

//     client.pushMessage("Ud3d86cb084fe75dcef808c1cceb7c025", messages
//     ).then(() => console.log("success")).catch(err => console.log(err));
// }
// pushNews();



// client.pushMessage("Ud3d86cb084fe75dcef808c1cceb7c025", messages
// ).then(() => console.log("success")).catch(err => console.log(err));