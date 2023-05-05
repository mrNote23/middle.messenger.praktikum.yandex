/*
  Класс создания компонента
  -------------------------
  скомпилированный шаблон handlebars передается при вызове super(view)
  переменные в шаблонизатор задаются стандартным способом Handlebars - {{variable}}
  и передаются объектом при вызове render({var: 'value'})

  обработчики событий прописываются по принципу <button event-click="[[handlerClick]]" event-mouseover="[[handlerMouseOver]]"></button>
  у создаваемого компонента должен присутствовать обработчик с именем handlerClick, handlerMouseOver

  пропсы в теге прописываются так: <form-component props-fields="[[formFields]]"></form-component>
*/

import State, { TSubscriberItem } from "./State";
import { TRecord } from "./config/types";

export type TProps = TRecord;

export type TEventResult = {
  detail: any;
};
export type TEvent = {
  eventName: string;
  eventHandler: (e: TEventResult) => void;
};

type TComponentParams = {
  [key: string]: unknown;
} | null;

type TListener = {
  node: HTMLElement;
  event: string;
  callBack: (e: unknown) => void;
};

export class Component extends HTMLElement {
  protected params: TComponentParams | null = null;

  protected _subscriptions: TSubscriberItem[] = [];
  protected _listeners: TListener[] = [];

  public props: TProps;
  private _props: TProps | any[] = {};
  private _events: TEvent[] = [];

  constructor(
    public view: ((params: TComponentParams) => string) | null = null
  ) {
    super();
    this.props = this._makePropsProxy(this, this._props);
  }

  // для тестирования ивентов
  public testEvent = (eventName: string, eventProps: any) => {
    this._events.forEach((event: TEvent) => {
      if (event.eventName === eventName) {
        event.eventHandler({ detail: eventProps });
      }
    });
  };

  // генерация события (event)
  protected createEvent = (
    eventName: string,
    eventProps: TRecord | any
  ): void => {
    // ивенты установленные через атрибуты
    this._events.forEach((event: TEvent) => {
      if (event.eventName === eventName) {
        event.eventHandler({ detail: eventProps });
      }
    });
    // для навешанных addListeners на данный компонент
    this.dispatchEvent(new CustomEvent(eventName, { detail: eventProps }));
  };

  // render component
  public render = (params: TComponentParams | null = null): void => {
    this.params = params;
    if (this.view !== null) {
      const html = <string>this.view(params);
      this.innerHTML = html;
      const attrs = this._parseAttributes(html);
      if (attrs) {
        this.querySelectorAll(attrs.join(",")).forEach((node: Component) => {
          this._addPropsAndEvents(node);
        });
      }
    }
  };

  // анимация на время загрузки данных для компонента
  protected loading(): void {
    this.innerHTML =
      "<div class='loader'><div></div><div></div><div></div><div></div></div>";
  }

  // добавление State.subscriber
  protected addSubscriber(varName: string, callBack: (val: unknown) => void) {
    this._subscriptions.push(State.subscribe(varName, callBack));
  }

  // добавление Event.listener
  protected addListener(
    node: HTMLElement | DocumentType | any,
    event: string,
    callBack: (e: unknown) => void
  ): void {
    node.addEventListener(event, callBack);
    this._listeners.push(<TListener>{ node, event, callBack });
  }

  // set event handler
  public setEvent = (
    eventName: string,
    eventHandler: (e: TEventResult) => void
  ) => {
    this._events.push(<TEvent>{ eventName, eventHandler });
  };

  // вызывается при изменении пропсов
  private _propsChanged(
    prop: string,
    oldValue: unknown,
    newValue: unknown
  ): void {
    if (oldValue != newValue && this["propsChanged"]) {
      this["propsChanged"](prop, oldValue, newValue);
    }
  }

  // Proxy для доступа к пропсам компонента
  private _makePropsProxy(component: Component, props: TProps): TProps {
    return new Proxy(props, {
      get(target: Component, prop: string) {
        return target[prop];
      },
      set(target: TProps, prop: string, value: unknown) {
        const oldValue = target[prop];
        target[prop] = value;
        component._propsChanged(prop, oldValue, value);
        return true;
      },
      deleteProperty(): never {
        throw new Error("Нет доступа");
      },
    });
  }

  private _parseAttributes = (html: string): Array<string> | null => {
    const tmp = new Set();
    const res = html.replace(/[\n\t]/g, "").match(/(event-\w+|props-\w+)/gi);
    if (res) {
      res.forEach((item) => {
        item.trim() && tmp.add(item);
      });
    }
    const resAttrs = Array.from(tmp).map((item) => `[${item}]`);
    return resAttrs.length ? resAttrs : null;
  };

  private _addPropsAndEvents(node: Component) {
    const removeAttributes = [];
    Object.values(node.attributes).forEach((attr) => {
      // props-data mounting
      if (attr.nodeName.match(/^props-(\w)+$/gi)) {
        const [propsName, propsValue] = [
          attr.nodeName.split("-")[1],
          node.getAttribute(attr.nodeName).replace(/(\[\[)|(]])/g, ""),
        ];
        // check props on object/array
        const args = propsValue.match(/(\[\S+\])|(\(\S+\))/gi);
        if (args) {
          window["_propsValue"] = <string>propsValue.match(/^[a-z0-9_-]+/gi)[0];
          node.props[propsName] = eval(
            "this[window._propsValue]" + args.join("")
          );
          delete window["_propsValue"];
        } else {
          node.props[propsName] = this[propsValue];
        }

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
        const args = eventCallback.match(/(\[\S+\])|(\(\S+\))/gi);
        if (args) {
          /* eslint-disable */
          const _eventCallback = eventCallback.match(/^[a-z0-9_-]+/gi)![0];
          if (this[_eventCallback]) {
            node.setEvent(eventName, () => {
              eval("this[_eventCallback]" + args.join(""));
            });
          }
        } else {
          if (this[eventCallback]) {
            if (node.setEvent) {
              node.setEvent(eventName, this[eventCallback]);
            } else {
              node[`on${eventName}`] = this[eventCallback];
            }
          }
        }
        // добавим в стек для дальнейшего удаления
        removeAttributes.push({
          node,
          attr: attr.nodeName,
        });
      }
    });

    // remove attributes
    removeAttributes.forEach((item) => {
      item.node.removeAttribute(item.attr);
    });
  }

  // отписка при отключении компонента от DOM
  protected disconnectedCallback() {
    // подписчики State
    this._subscriptions.forEach((elm: TSubscriberItem) =>
      State.unsubscribe(elm)
    );
    this._subscriptions.length = 0;

    // Слушатели событий
    this._listeners.forEach((item: TListener) => {
      item.node.removeEventListener(item.event, item.callBack);
    });
    this._listeners.length = 0;

    // вызовем метод потомка
    this["disconnected"] && this["disconnected"]();
  }

  // component mounted
  protected connectedCallback() {
    this["connected"] && this["connected"]();
  }
}
