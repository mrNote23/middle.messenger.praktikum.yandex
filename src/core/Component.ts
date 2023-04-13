/*
  Класс создания компонента
  -------------------------
  переменные задаются стандартным способом Handlebars - {{variable}}
  и передаются объектом при вызове super({var: 'value'})

  обработчики событий прописываются по принципу <button event-click=[[handlerClick]] event-mouseover=[[handlerMouseOver]]></button>
  у создаваемого компонента должен присутствовать обработчик с именем handlerClick, handlerMouseOver
*/

import State, { TSubscriberItem } from "./State";

type TComponentParams = {
  [key: string]: unknown;
} | null;

export class Component extends HTMLElement {
  subscriptions: TSubscriberItem[] = [];
  listeneners: Array<any> = [];
  params: TComponentParams | null = null;

  constructor(
    public view: ((params: TComponentParams) => string) | null = null
  ) {
    super();
    this.subscriptions = [];
  }

  // анимация на время загрузки данных для компонента
  loading(): void {
    this.innerHTML =
      "<div class='loader'><div></div><div></div><div></div><div></div></div>";
  }

  // добавление подписчика в стэк
  set subscriber(subs: TSubscriberItem) {
    this.subscriptions.push(subs);
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
    if (node.childNodes) {
      node.childNodes.forEach((itemNode) => {
        if (itemNode.nodeType === 1 && itemNode.attributes) {
          for (const key in itemNode.attributes) {
            if (
              itemNode.attributes[key].nodeName &&
              itemNode.attributes[key].nodeName.match(/^event-(\w)+$/gi)
            ) {
              const [eventName, eventCallback] = [
                itemNode.attributes[key].nodeName.split("-")[1],
                itemNode.attributes[key].nodeValue.replace(/(\[\[)|(]])/g, ""),
              ];
              if (this[eventCallback]) {
                // добавим обработчик события
                itemNode.addEventListener(eventName, this[eventCallback]);
                // добавим в стэк слушателей
                this.listeneners.push({
                  node: itemNode,
                  event: eventName,
                  listener: this[eventCallback],
                });
              }
              // удалим атрибут event-* для красоты
              // itemNode.removeAttribute(itemNode.attributes[key].nodeName);
            }
          }
        }
        this.setEvents(itemNode);
      });
    }
  };

  // отписка при отключении компонента от DOM
  disconnectedCallback() {
    // подписчики State
    this.subscriptions.forEach((elm) => State.unsubscribe(elm));
    // Слушатели событий
    this.listeneners.forEach((item) => {
      item.node.removeEventListener(item.event, item.listener);
    });
  }
}
