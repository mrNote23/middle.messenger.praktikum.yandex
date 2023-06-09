[![Netlify Status](https://api.netlify.com/api/v1/badges/74a2810d-57bf-4131-a0a8-4972b88879a0/deploy-status)](https://app.netlify.com/sites/andreys/deploys)

# CHAT

#### Сервис обмена текстовыми сообщениями в сети в режиме реального времени. Данное веб-приложение позволяет неограниченному числу пользователей одновременно общаться между собой.

#### Проектная работа выполняется в рамках курса "Миддл-фронтенд Разработчик" от Яндекс Практикума

Доступно на [Netlify](https://andreys.netlify.app/)

Доступно на [Render](https://andreys-chat.onrender.com)

<a href="https://andreys.netlify.app/" target="_blank" rel="noopener noreferrer">
 <img src="https://i.ibb.co/2kXYxTk/desktop-chat.jpg" alt="chat application" draggable="false" >
</a>

## Текущий этап

### Спринт 1 / 4 [(PR)](https://github.com/mrNote23/middle.messenger.praktikum.yandex/pull/2)

- Верстка в соответствии с [макетом](https://ibb.co/x7V8WN7)
- Полностью работает навигация по страницам и разделам

### Спринт 2 / 4 [(PR)](https://github.com/mrNote23/middle.messenger.praktikum.yandex/pull/3)

- Подключен TypeScript
- Добавлены компоненты
- Организован стейт-менеджмент
- Реализована валидация всех форм
- Добавлены ESLint, StyleLint
- Добавлен класс для работы с HTTP запросами

### Спринт 3 / 4 [(PR)](https://github.com/mrNote23/middle.messenger.praktikum.yandex/pull/4)

- Добавлен прелоадер
- Сделан роутинг приложения (Class Router)
  - все страницы приложения имеют свои url
    - /chats
    - /chat/:chatId
    - /chat-profile/:chatId
    - /users/:chatId
    - /user/:chatId/:userId
    - /login
    - /register
    - /profile
    - /404
    - /500
- Реализованы методы взаимодействия с API
- Реализован обмен сообщениями с помощью WebSocket
- Реализован полный функционал чата, а именно:
  - регистрация пользователя;
  - авторизация пользователя;
  - деавторизация пользователя;
  - редактирование профиля пользователя;
  - изменение пароля пользователя;
  - изменение аватара пользователя;
  - создание чата;
  - удаление чата;
  - изменение аватара чата;
  - добавление собеседника в чат;
  - удаление собеседника из чата;
  - просмотр профиля собеседника;
  - отправка текстовых сообщений в чат;
  - отправка файлов в чат;
  - просмотр/прослушивание для аудио/видео/фото сообщений;

### Спринт 4 / 4 [(PR)](https://github.com/mrNote23/middle.messenger.praktikum.yandex/pull/5)

- Изменены эндпоинты в соответствии с заданием
  - /chats -> /messenger
  - /login -> /sign-in
  - /register -> /sign-up
  - /profile -> /settings
- Parcel заменен на WebPack
- Настроен Docker
  - Приложение опубликовано на render.com
- Настроен pre-commit (Husky)
- Покрыты тестами (Mocha)
  - Router
  - Component
  - HTTPTransport

## СТЭК

- HTML
- Typescript
- Javascript
- Handlebars
- WebPack
- Docker
- Husky
- SASS
- PostCSS
- ESLint
- StyleLint
- Mocha
- Chai

# Структура приложения (DOM)

```mermaid
flowchart TD
    router --> login-page
    router --> register-page
    router --> chat-page
    router --> error-404
    router --> error-500
    chat-page --> left-block
    chat-page --> right-block
    left-block --> left-content-switch
    left-content-switch --> chats-list
    left-content-switch --> users-list
    right-block --> right-content-switch
    right-content-switch --> chat-messages
    right-content-switch --> chat-profile
    right-content-switch --> user-profile
    right-content-switch --> admin-profile

```

## Управление состояниями с помощью класса `State()`

### **`Class State()`**

- `store()` - сохранение объекта (переменной) без оповещения подписчиков
- `extract()` - извлечение объекта
- `subscribe()` - подписка на изменение объекта
- `onceSubscribe()` - как subscribe, только выполняется один раз
- `unsubscribe()` - отписка
- `dispatch()` - изменение объекта с оповещением подписчиков
- `clear()` - удаление всех объектов и подписчиков

[Пример использования](https://stackblitz.com/edit/sws-state-manager?file=index.ts)

## Компоненты приложения создаются на базе класса `Component()`

### **`Class Component()`**

Шаблон компонента (precompiled hbs) передается в методе `super()` при создании экземпляра класса,
либо позже в `this.view` до вызова метода `this.render()`

Перед использованием созданного компонента, его необходимо объявить:

```typescript
customElements.define('main-component', MainComponent)
```

### Методы используемые внутри компонента

- `render()` - рендер компонента с параметрами? для шаблона handlebars
- `connected()` - метод вызывается после монтирования компонента в DOM
- `disconnected()` - метод вызывается перед демонтированием компонента из DOM
- `addSubscriber()` - добавляет подписчика State
- `addListener()` - добавляет слушателя eventListener
- `props` - пропсы компонента прописанные в атрибуте props-*
- `propsChanged()` - метод вызывается при изменении пропсов
- `createEvent()` - создание события с названием eventName

После демонтирования компонента из DOM, все подписчики и слушатели установленные через `addSubscriber` и
`addListener` - удаляются.
Т.е. слушатели событий назначаются следующим образом: `this.addListener(node, 'click', clickHandler)`

Все параметры (пропсы, слушатели событий) прописываются в теге компонента с помощью атрибутов `event-*` и `props-*`

 ```HTML

<main-component
  class="list-users"
  props-users="[[usersList]]"
  event-select="[[onSelect]]"
>
</main-component>
 ```

#### Пример использования:

```typescript
// MainComponent.ts
import view from "./MainComponent.hbs";
import {State} from "./State";
import {Component} from "./Component";

export class MainComponent extends Component {
  props: {
    title: string;
    counter: number;
  };

  constructor() {
    super(view);
  }

  onInput = (e: InputEvent): void => {
    this.getElementsByTagName("h1")[0].textContent = e.target.value;
  };

  onClick = (): void => {
    this.props.counter = 0;
    State.dispatch("counter", this.props.counter);
  };

  showCounter = (val: number): void => {
    this.getElementsByTagName("h2")[0].textContent = val;
  };

  connected(): void {
    this.getProps.then((props: any) => {
      this.props = props;
      this.render({...this.props});

      State.store("counter", this.props.counter);
      this.addSubscriber("counter", this.showCounter);

      setInterval(() => {
        this.props.counter++;
        State.dispatch("counter", this.props.counter);
      }, 1000);
    });
  }
}

```

```HTML
<!--MainComponent.hbs-->
<h1>{{title}}</h1>
<h2>{{counter}}</h2>
<input type="text" name="title" event-input="[[onInput]]" value="{{title}}">
<button event-click="[[onClick]]">Reset counter</button>
```

# Примеры использования некоторых компонент

## ContentSwitch

**Динамическое изменение контента в зависимости от пропса `path`**

```typescript
// App.ts
import view from "./App.hbs";
import {Component} from "./Component";
import {ContentSwitch} from "./ContentSwitch";

customElements.define("content-switch", ContentSwitch);

type TRoute = {
  path: string;
  content?: string;
  redirect?: string;
};

export class App extends Component {
  rootRoutes: TRoute[] = [
    {
      path: "/",
      content: "<chat-page></chat-page>",
    },
    {
      path: "/login",
      content: "<login-page></login-page>",
    },
    {
      path: "/register",
      content: "<register-page></register-page>",
    },
    {
      path: "/404",
      content: "<error-page>404</error-page>",
    },
    {
      path: "/500",
      content: "<error-page>500</error-page>",
    },
    {
      path: "*",
      redirect: `/404`,
    },
  ];

  constructor() {
    super(view({path: "/"}));
  }

  connected() {
    this.render();
  }
}
```

```HTML
<!-- App.hbs-->
<content-switch props-path="{{path}}" props-routes="[[rootRoutes]]">
  ...
  content
  ...
</content-switch>
```

## FormValidator

**Валидация форм**

```typescript
// Login.ts
import view from "./Login.hbs";
import {Component} from "./Component";
import {FormValidator} from "./FormValidator";

customElements.define("form-validator", FormValidator);

enum MATCH {
  PHONE = "phone", // телефон в формате +78217348374, '+' - не обязателен
  EMAIL = "email", // стандартный email
  PASSWORD = "password", // символы в разных регистрах и цифры
}

type TFormValidatorConfig = {
  [key: string]: {
    required?: boolean; // true - обязательное поле
    firstUC?: boolean; // true - первая буква станет заглавной
    minLength?: number; // минимальная длина
    maxLength?: number; // максимальная длина (автоматическая обрезка)
    match?: MATCH; // тип поля для валидации
    message?: string; // сообщение при неверном вводе
    compare?: string; // имя поля для сравнения (например для подтверждения пароля)
    filter?: unknown; // регулярное выражение, удалится все, что описано
  };
};

export class Login extends Component {
  formFields: TFormValidatorConfig = {
    login: {
      required: true,
      minLength: 3,
      maxLength: 20,
      filter: /[^а-яa-z0-9-]+/gi,
      message: "3 to 20 characters, letters, numbers, '-'",
    },
    password: {
      required: true,
      minLength: 8,
      maxLength: 40,
      message: "8 to 40 characters",
    },
  };

  constructor() {
    super(view);
  }

  // результат возвращается в e.detail
  // при событии формы 'submit' возвращаются данные формы
  // при событии 'reset' возвращается false
  formValidated = (e: CustomEvent): void => {
    console.log(`You are logined: ${e.detail}`);
  };

  connected(): void {
    this.render();
  }
}
```

```HTML
<!--Login.hbs-->
<form-validator props-fields="[[formFields]]" event-validated="[[formValidated]]">
  <form novalidate>
    <input type="text" name="login" id="login">
    <label for="login">Login</label>
    <input type="password" name="password" id="password">
    <label for="password">Password</label>
    <button type="submit">Sign in</button>
  </form>
</form-validator>
```

# Установка и запуск приложения

### Установка пакета

```text
git clone https://github.com/mrNote23/middle.messenger.praktikum.yandex.git chat-app
```

```text
cd chat-app
```

### Установка зависимостей

```text
npm install
```

### Проверки ESLint, StyleLint

```text
npm run lint:eslint
npm run lint:stylelint
```

### Тесты (Mocha)

```text
npm run test
```

### Сборка проекта (WebPack)

```text
npm run build
```

### Запуск на http://localhost:3000

```text
npm start
```


