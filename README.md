[![Netlify Status](https://api.netlify.com/api/v1/badges/74a2810d-57bf-4131-a0a8-4972b88879a0/deploy-status)](https://app.netlify.com/sites/andreys/deploys)

# CHAT

#### Сервис обмена текстовыми сообщениями в сети в режиме реального времени. Данное веб-приложение позволяет неограниченному числу пользователей одновременно общаться между собой.

#### Проектная работа выполняется в рамках курса "Миддл-фронтенд Разработчик" от Яндекс Практикума

Доступно на [Netlify](https://andreys.netlify.app/)

<a href="https://andreys.netlify.app/" target="_blank" rel="noopener noreferrer">
 <img src="https://i.ibb.co/2kXYxTk/desktop-chat.jpg" alt="chat application" width="70%" draggable="false" >
</a>

## Текущий этап

### Спринт 1 / 4 [(PR)](https://github.com/mrNote23/middle.messenger.praktikum.yandex/pull/2)

- Верстка в соответствии с [макетом](https://ibb.co/x7V8WN7)
- Полностью работает навигация по страницам и разделам

### Спринт 2 /4 [(PR)](https://github.com/mrNote23/middle.messenger.praktikum.yandex/pull/3)

- Подключен TypeScript
- Добавлены компоненты
- Организован стейт-менеджмент
- Реализована валидация всех форм
- Добавлены ESLint, StyleLint
- Добавлен класс для работы с HTTP запросами

## СТЭК

- HTML
- Javascript
- Typescript
- Handlebars
- Parcel
- SASS
- PostCSS

## Установка и запуск приложения

Установка пакета

```text
git clone https://github.com/mrNote23/middle.messenger.praktikum.yandex.git chat-app
```

```text
cd chat-app
```

Установка зависимостей

```text
npm install
```

Сборка проекта (Parcel)

```text
npm run build
```

Запуск на http://localhost:3000

```text
npm start
```

Проверки ESLint, StyleLint

```text
npm run lint:eslint
npm run lint:stylelint
```
