import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import dotenv from 'dotenv';



dotenv.config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

const keywords = ['frontend', 'react', 'vue', 'next.js', 'junior', 'стажер', 'удаленно', 'remote'];

const allowedChats = ['@devkg', '@remote', '@codifynews', '@JScript_jobs', '@runello_rus_webdevelopment', '@job_react', '@easy_frontend_jobs', '@forfrontend', '@remote'];

const saveVacancy = (vacancy) => {
  const path = './data/vacancies.json';
  const old = fs.existsSync(path) ? JSON.parse(fs.readFileSync(path)) : [];
  fs.writeFileSync(path, JSON.stringify([...old, vacancy], null, 2));
};

bot.on('message', (msg) => {
    const text = msg.text?.toLowerCase() || '';
    const username = msg.chat.username ? '@' + msg.chat.username : msg.chat.title || '';
  
    if (allowedChats.includes(username) && keywords.some((w) => text.includes(w))) {
      const record = {
        chat: username,
        text: msg.text,
        date: new Date().toISOString()
      };
  
      saveVacancy(record);
  
      console.log(`✅ [${username}] Найдена вакансия:\n---\n${msg.text}\n---\n`);
    }
  });
