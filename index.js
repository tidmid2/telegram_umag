const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
require('./db.js');
// const webAppUrl = 'https://ornate-selkie-c27577.netlify.app';
var corsOptions = {
    origin: "http://localhost:5000"
  };


const bot = new TelegramBot(process.env.TELERAM_TOKEN, {polling: true});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const routes = require('./routes/routes');
app.use('/', routes);

app.use(cors(corsOptions));

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).send({
      error: {
          status: error.status || 500,
          data: error.message || 'Internal Server Error',
      },
  })
})
const start = async () => {

    try{
        await bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const text = msg.text;
            if(text === '/start') {
                await bot.sendMessage(chatId, `<b>Rencore  Tis</b>\n` + 
                'Ваша личная учетная система. \n\n Выберите из меню, чем я могу Вам помочь',
                // {parse_mode: 'HTML'}, 
                {
                    reply_markup: {
                        keyboard: [
                            // [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}],
                            [{text: 'Посмотреть список установок'}],
                            [{text: 'Посмотреть список сотрудников'}]
                        ]
                    }
                });
    
                // await bot.sendMessage(chatId, 'Выберите одну из кнопок ниже', {
                //     reply_markup: {
                //         inline_keyboard: [
                //             [{text: 'Посмотреть список установок'}],
                //             [{text: 'Посмотреть список сотрудников'}]
                //         ]
                //     }
                // })
            }

            if(text === 'Посмотреть список сотрудников') {
                const telegramSendImageOptions = {
                    url: `http://localhost:${process.env.PORT}/app`,
                    method: "get",
                }
                const { data } = await axios(telegramSendImageOptions);
                await bot.sendMessage(chatId,'Ваши данные'+ data.map(userFullnames => (`\n${userFullnames.id}  ${userFullnames.name}`)));
                
            }
        });
    } catch (e){
        console.log('Подключение к бд сломалось', e)
    }

    
}


app.listen(process.env.PORT, () => {
	console.log(`API listening at http://localhost:${process.env.PORT}`);
});
start();