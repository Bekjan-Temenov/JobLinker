const { fetchVacancies } = require('./controllers/vacancyService');

// Запускаем парсинг
fetchVacancies().then(vacancies => {
  console.log('Найденные вакансии:', vacancies);
});
