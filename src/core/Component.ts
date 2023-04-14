/*
  Класс создания компонента
  -------------------------
  скомпилированный шаблон handlebars передается при вызове super(view)
  переменные в шаблонизатор задаются стандартным способом Handlebars - {{variable}}
  и передаются объектом при вызове render({var: 'value'})

  обработчики событий прописываются по принципу <button event-click="[[handlerClick]]" event-mouseover="[[handlerMouseOver]]"></button>
  у создаваемого компонента должен присутствовать обработчик с именем handlerClick, handlerMouseOver

  пропсы в теге прописываются так: <form-component props-data="[[formFields]]"></form-component> передаются объектом!
  все данные в компонент передаются одним объектом
  получать данные как результат промиса!!!
*/

import State, { TSubscriberItem } from "./State";

type TComponentParams = {
  [key: string]: unknown;
} | null;

type TListener = {
  node: unknown;
  event: string;
  listener: unknown;
};

export class Component extends HTMLElement {
  protected subscriptions: TSubscriberItem[] = [];
  protected listeners: Array<unknown> = [];
  protected params: TComponentParams | null = null;
  public _props: object | null = null;

  constructor(
    public view: ((params: TComponentParams) => string) | null = null
  ) {
    super();
  }

  // генерация события (event)
  // для компонента прописывается так <component event-ping=[[pingHandler]]>
  // ping - event
  // pingHandler - обработчик
  createEvent = (eventName: string, eventProps: unknown): void => {
    this.dispatchEvent(new CustomEvent(eventName, { detail: eventProps }));
  };

  // анимация на время загрузки данных для компонента
  loading(): void {
    this.innerHTML =
      "<div class='loader'><div></div><div></div><div></div><div></div></div>";
  }

  // добавление State.subscriber в стэк
  set subscriber(subs: TSubscriberItem) {
    this.subscriptions.push(subs);
  }

  // добавление Event.listener в стэк
  set listener(listener: TListener) {
    this.listeners.push(listener);
  }

  // установка пропсов компонета
  set setProps(props: object) {
    this._props = props;
  }

  // получение пропсов компонента
  get getProps() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this._props);
      });
    });
  }

  // рeндер компонента
  render = (params: TComponentParams | null = null): void => {
    this.params = params;
    if (this.view !== null) {
      this.innerHTML = this.view(params);
      this.setEvents(this);
    }
  };

  // установка обработчиков событий
  setEvents = <T>(node: T): void => {
    let removeAttributes = [];
    if (node.childNodes) {
      node.childNodes.forEach((itemNode) => {
        if (itemNode.nodeType === 1 && itemNode.attributes) {
          removeAttributes = [];
          for (const key in itemNode.attributes) {
            if (itemNode.attributes[key].nodeName) {
              // props-data mounting
              if (itemNode.attributes[key].nodeName === "props-data") {
                const propsName = itemNode.attributes[key].nodeValue.replace(
                  /(\[\[)|(]])/g,
                  ""
                );
                itemNode.setProps = this[propsName];
              }

              // events mounting
              if (itemNode.attributes[key].nodeName.match(/^event-(\w)+$/gi)) {
                const [eventName, eventCallback] = [
                  itemNode.attributes[key].nodeName.split("-")[1],
                  itemNode.attributes[key].nodeValue.replace(
                    /(\[\[)|(]])/g,
                    ""
                  ),
                ];
                if (this[eventCallback]) {
                  // добавим обработчик события
                  itemNode.addEventListener(eventName, this[eventCallback]);
                  // добавим в стэк слушателей
                  this.listener = {
                    node: itemNode,
                    event: eventName,
                    listener: this[eventCallback],
                  };
                }
                // добавим в стек для дальнейшего удаления
                removeAttributes.push({
                  node: itemNode,
                  attr: itemNode.attributes[key].nodeName,
                });
              }
            }
          }
        }
        // удалим атрибуты
        removeAttributes.forEach((item) => {
          item.node.removeAttribute(item.attr);
        });
        // проверим вложенные элементы
        this.setEvents(itemNode);
      });
    }
  };

  // отписка при отключении компонента от DOM
  disconnectedCallback() {
    // подписчики State
    this.subscriptions.forEach((elm) => State.unsubscribe(elm));
    // Слушатели событий
    this.listeners.forEach((item) => {
      item.node.removeEventListener(item.event, item.listener);
    });
  }
}
