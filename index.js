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
                {parse_mode: "HTML" ,
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: [
                            // [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}],
                            [{text: 'Посмотреть список установок'}],
                            [{text: 'Создать контрагента'}],
                            [{text: 'Создать Объект'}],
                            [{text: 'Назначить выезд'}],
                            [{text: ''}],
                            [{text: 'Посмотреть список сотрудников'}]
                        ]
                    }
                }
                );
    
                // await bot.sendMessage(chatId, 'Выберите одну из кнопок ниже', {
                //     reply_markup: {
                //         inline_keyboard: [
                //             [{text: 'Посмотреть список установок'}],
                //             [{text: 'Посмотреть список сотрудников'}]
                //         ]
                //     }
                // })
                //вывод массива информации
                if(text === 'Посмотреть список сотрудников') {
                    const telegramSendImageOptions = {
                        url: `http://localhost:${process.env.PORT}/app`,
                        method: "get",
                    }
                    const { data } = await axios(telegramSendImageOptions);
                    await bot.sendMessage(chatId,'Ваши данные'+ data.map(userFullnames => (`\n${userFullnames.id}  ${userFullnames.name}`)));
                };


                //внутреняя клавиатура
                if(text === 'Посмотреть список установок') {
                    const telegramSendImageOptions = {
                        url: `http://localhost:${process.env.PORT}/app`,
                        method: "get",
                    }
                    const { data } = await axios(telegramSendImageOptions);
                    await bot.sendMessage(
                        chatId, 
                        'Ваши данные', {
                            reply_markup: JSON.stringify({
                                resize_keyboard: true,
                                inline_keyboard: data.map(userFullnames =>(
                                    [{text: `${userFullnames.name}`, callback_data: `${userFullnames.id}`}]
                                ))
                            })
                        }
                    )
                    // await bot.on('callback_query', query =>{bot.sendMessage(query.chatId, 'Ваши данные', query.date)})
                    // await bot.answerCallbackQuery(query.chatId, 'Ваши данные', query.date) //alert
                };
            };
            const Keyboard = [
                
                    [{ text: 'Tis', callback_data: '1' }],
                    [{ text: 'Uno', callback_data: '2' }],
                    [{ text: 'Bestprofi', callback_data: '3' }]
                
            ];

            const numberKeyboard = [
                
                    [{ text: '1', callback_data: '11' }],
                    [{ text: '2', callback_data: '21' }],
                    [{ text: '3', callback_data: '31' }]
                
            ];
            const userKeyboard  = [
                
                    [{ text: '4', callback_data: '12' }],
                    [{ text: '5', callback_data: '22' }],
                    [{ text: '6', callback_data: '32' }]
                
            ];

                

            if(text === '/service') {
                await bot.sendMessage(chatId, 'Выберите свою должность', {
                    reply_markup: {
                        inline_keyboard: Keyboard
                    }
                    }
                )

                //post
                // try {
                //     await axios.post(TELEGRAM_URI, {
                //       chat_id: chatId,
                //       text: responseText
                //     })
                //     res.send('Done')
                //   } catch (e) {
                //     console.log(e)
                //     res.send(e)
                //   }

                bot.on('callback_query', (query) => {
                    const id = query.message.chat.id;
                    if (query.data === '11') {
                            bot.sendMessage(id, `Ок, напомню `);
                            bot.editMessageReplyMarkup({ inline_keyboard: userKeyboard }, { chat_id: id, message_id: query.message.message_id })
                        
                          } else if (query.data === '22') {
                            bot.sendMessage(id, `Ок`);
                            bot.editMessageReplyMarkup({ inline_keyboard: numberKeyboard }, { chat_id: id, message_id: query.message.message_id })
                        
                          } else {
                            bot.sendMessage(id, ` напомню`);
                            bot.editMessageReplyMarkup({ inline_keyboard: keyboard }, { chat_id: id, message_id: query.message.message_id })
                        
                          }
                        })   
                    
                    // if (query.data=='numberKeyboard') { //пользователь уже выбрал
                    //     bot.sendMessage(chatId, 'Выберите свою должность', {
                    //         reply_markup: JSON.stringify({
                    //             inline_keyboard: [
                    //                 [{ text: 'Менеджер', callback_data: '11' }],
                    //                 [{ text: 'Техник', callback_data: '22' }],
                    //                 [{ text: 'Руководитель тех. отдела', callback_data: '33' }],
                    //                 [{ text: 'Руководитель отдела продаж', callback_data: '44' }]
                    //             ]
                    //         })
                    //         }
                    //     )
                    //     bot.on('callback_query', (queryy) => {
                    //         let ids = queryy.message.chat.id;
                    //         if (queryy.data) { //пользователь уже выбрал
                    //             bot.on('message', (msg) => {
                    //                 bot.sendMessage(id, `Ок, напомню ${msg.text}`);
                    //               });

                    //         } else if (!queryy.data) { //пользователь не ввёл 
                    //             return bot.sendMessage(ids, `Вы ничего не выбрали`);
                    //         }
                    //    })
                    // bot.editMessageReplyMarkup({ inline_keyboard: numberKeyboard }, { chat_id: chatId, message_id: query.message.message_id })
                    // } else if (!query.data) { //пользователь не ввёл 
                    //     return bot.sendMessage(ids, `Вы ничего не выбрали`);
                    // }
            //    })
            };

            

            
        });
    } catch (e){
        console.log('Подключение к бд сломалось', e)
    }

    
}


app.listen(process.env.PORT, () => {
	console.log(`API listening at http://localhost:${process.env.PORT}`);
});
start();



//post
 // try {
                //     await axios.post(TELEGRAM_URI, {
                //       chat_id: chatId,
                //       text: responseText
                //     })
                //     res.send('Done')
                //   } catch (e) {
                //     console.log(e)
                //     res.send(e)
                //   }