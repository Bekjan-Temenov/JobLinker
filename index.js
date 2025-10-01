const TelegramBot = require('node-telegram-bot-api');
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');

const botToken = '7812065409:AAFlm3oewp2ZuO4BLSABvv0y6VZzo0BxkMQ';
const bot = new TelegramBot(botToken, { polling: true });

const apiId = 25282310;
const apiHash = 'e49f0e092c1e6f2a30ac59b31f3a7c93';
const stringSession = new StringSession('1AgAOMTQ5LjE1NC4xNjcuNTEBu7/CJv/fDenh4JfDRmHlJ3j0ET1Bzy6cxpiU0oRXVrUt5vbeKVOH21LpyWlynX0zOJ2YnEEDDbKavUa4sXCYs/y+JUgJL6xStoH9yfzqT8jfFmwc5xOwpGLMGpJaIvLa9yATjIfIQKnc8IWsbdNKhczcNTrv9sf19KkbEo1vp2wPuZlvFA/GWzfn9L3EOpUWGuIHzUix6kvW9xF3Oyg9DWZdEBUD1OG23XOruJdNWWsJJ/+A79cRpnwFU63EOMrEXS/xir3azgdU3YGj2V2jvS5g8blPE8akyQr9ueXf/nG+HpSCoRTJ+U0wqlRemrk2EWVKHgmxysTPu+57MqO/HUg='); 

const channels = ['@devkg', '@remote', '@codifynews', '@JScript_jobs', '@runello_rus_webdevelopment', '@job_react', '@easy_frontend_jobs', '@forfrontend', '@remote'];

const keywords = ['frontend', 'frontend junior', 'frontend middle', 'react', 'javascript',  'Frontend Developer','next.js', 'Frontend разработчик', 'Frontend'];

const chatId = 6808962395;

const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

const sentMessages = new Set(); 

async function startBot() {
    try {
        await client.start({
            phoneNumber: async () => '+996502720630',
            password: async () => 'YOUR_PASSWORD',
            phoneCode: async () => prompt('Enter code: '),
            onError: (err) => console.log(err),
        });

        console.log('Клиент запущен');

        for (const channel of channels) {
            try {
                console.log(`Проверяю канал: ${channel}`);
                const messages = await client.getMessages(channel, { limit: 100 });
                console.log(`Найдено сообщений в ${channel}: ${messages.length}`);
                
                messages.forEach((message) => {
                    if (message.text && !sentMessages.has(message.id)) {
                        const text = message.text.toLowerCase();
                        if (keywords.some(keyword => text.includes(keyword)) && !text.includes('senior')) {
                            console.log(`Отправляю вакансию из ${channel}`);
                            console.log('message.text', message.text);
                            bot.sendMessage(chatId, `Найдена вакансия в ${channel}:\n${message.text}`);
                            
                            sentMessages.add(message.id);
                        }
                    }
                });
            } catch (channelError) {
                console.error(`Ошибка в канале ${channel}:`, channelError.message);
            }
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question) {
    return new Promise((resolve) => {
        readline.question(question, (answer) => {
            resolve(answer);
        });
    });
}

startBot().catch(console.error);

setInterval(startBot, 3600000);