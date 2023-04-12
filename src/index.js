import "./assets/css/index";
import Chat from "./core/Chat";

Chat.start();

// TODO: Необходимо описать в readme использование компонентов customElements и т.п,
// TODO: В коде при использовании компонентов (customElements) необходимо описать что и почему
// TODO: Разобраться с ESLint
// TODO: Элемент списка пользователя и чата вынести в отдельные компоненты

const str = "A as sfпрПаdf 78 - _=,sfsdf%#";
const filter = /[^а-яa-z\-]+/gi;
console.log(str.replace(filter, ""));
