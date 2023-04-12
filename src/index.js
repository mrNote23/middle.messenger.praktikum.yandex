// https://github.com/Yandex-Practicum/tests-second-floor
// https://ya-praktikum.tech/api/v2/swagger/#/
// new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
// https://ya-praktikum.tech/api/v2/openapi/ws
// {
//   "first_name": "Andrey",
//   "second_name": "Suvorov",
//   "login": "AndreyS",
//   "email": "suvorov.av93@yandex.ru",
//   "password": "CesdfDdfsd34sf",
//   "phone": "+79528206069"
// }
// Response:
// {
//   "id": 810558
// }
// chatId = 10262
// после логина передается кука: authCookie

import "./assets/scss/index.ts";
import ChatApp from "./core/ChatApp.ts";

ChatApp.start();

// const conn = new WebSocket("wss://ya-praktikum.tech/ws/chats/10262");
const conn = new WebSocket(
  `wss://ya-praktikum.tech/ws/chats/810558/10262/2e89cad7c7dd7a7aa97cd861885b714fee545a90:1681328369`
);

conn.onopen = (e) => {
  console.log(e);
  conn.onmessage = (e) => {
    console.log(e);
  };
  conn.send(JSON.stringify({ type: "ping" }));
};

// const conn = new WebSocket(
//   `wss://ya-praktikum.tech/ws/chats/810558/10262/2e89cad7c7dd7a7aa97cd861885b714fee545a90:1681328369`
// );

// 2e89cad7c7dd7a7aa97cd861885b714fee545a90:1681328369
