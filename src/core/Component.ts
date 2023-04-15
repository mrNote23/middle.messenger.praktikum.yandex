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
  protected _events = [];

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
    // ивенты установленные через пропсы
    this._events.forEach((event) => {
      if (event.eventName === eventName) {
        event.eventHandler({ detail: eventProps });
      }
    });
    // ивенты навешанные листенером
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

  // set component's props
  set setProps(props: object) {
    this._props = props;
  }

  // get component's props
  get getProps() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this._props);
      });
    });
  }

  // set event handler
  setEvent = (eventName, eventHandler) => {
    this._events.push({ eventName, eventHandler });
  };

  // render component
  render = (params: TComponentParams | null = null): void => {
    this.params = params;
    if (this.view !== null) {
      const html = this.view(params);
      this.innerHTML = html;

      const attrs = this._parseAttributes(html);
      const needNodes = [];
      if (attrs) {
        this.querySelectorAll(attrs.join(",")).forEach((elm) => {
          needNodes.push(elm);
        });
      }
      if (needNodes.length) {
        this._addEvents(needNodes);
      }
    }
  };

  _parseAttributes = (html) => {
    let tmp = new Set();
    let sou = html.replace(/[\n\t]/g, "");
    const regex = /(event-\w+|props-\w+)/gi;
    const res = sou.match(regex);
    if (res) {
      res.forEach((item) => {
        item.trim() && tmp.add(item);
      });
    }
    const resAttrs = Array.from(tmp).map((item) => `[${item}]`);
    return resAttrs.length ? resAttrs : null;
  };

  private _addEvents(nodes) {
    let removeAttributes = [];
    nodes.forEach((node) => {
      for (const [key, attr] of Object.entries(node.attributes)) {
        // props-data mounting
        if (attr.nodeName.match(/^props-(\w)+$/gi)) {
          const propsName = node
            .getAttribute(attr.nodeName)
            .replace(/(\[\[)|(]])/g, "");
          node.setProps = this[propsName];
          // добавим в стек для дальнейшего удаления
          removeAttributes.push({
            node,
            attr: attr.nodeName,
          });
        }

        // events-mounting
        if (attr.nodeName.match(/^event-(\w)+$/gi)) {
          const [eventName, eventCallback] = [
            attr.nodeName.split("-")[1],
            node.getAttribute(attr.nodeName).replace(/(\[\[)|(]])/g, ""),
          ];
          if (this[eventCallback]) {
            if (node.setEvent) {
              node.setEvent(eventName, this[eventCallback]);
            } else {
              node[`on${eventName}`] = this[eventCallback];
            }
          }
          // добавим в стек для дальнейшего удаления
          removeAttributes.push({
            node,
            attr: attr.nodeName,
          });
        }
      }
      // remove attributes
      removeAttributes.forEach((item) => {
        item.node.removeAttribute(item.attr);
      });
    });
  }

  // отписка при отключении компонента от DOM
  disconnectedCallback() {
    // подписчики State
    this.subscriptions.forEach((elm) => State.unsubscribe(elm));
    // Слушатели событий
    this.listeners.forEach((item) => {
      item.node.removeEventListener(item.event, item.listener);
    });
    // вызовем метод потомка
    this["disconnected"] && this["disconnected"]();
  }

  // component mounted
  connectedCallback() {
    this["connected"] && this["connected"]();
  }
}
