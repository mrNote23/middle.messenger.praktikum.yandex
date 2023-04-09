import { TSubscriberItem, UnSubscribe } from "./State";

type TComponentParams = { [key: string]: any } | {} | null;

type TComponentEvent = {
  selector: string | object;
  event: string;
  cb: any;
};

export class Component extends HTMLElement {
  subscriptions: TSubscriberItem[] = [];

  constructor(
    public view: ((params: TComponentParams) => string) | null = null
  ) {
    super();
    this.subscriptions = [];
  }

  loading(): void {
    this.innerHTML = '<div class="loader">Loading...</div>';
  }

  set subscriber(subs: TSubscriberItem) {
    this.subscriptions.push(subs);
  }

  render = (
    params: TComponentParams = null,
    events: TComponentEvent[] = []
  ): void => {
    if (this.view !== null) {
      this.innerHTML = this.view(params);
      events.forEach((elm) => {
        switch (typeof elm.selector) {
          case "string":
            document.querySelectorAll(elm.selector).forEach((node: Element) => {
              node.removeEventListener(elm.event, elm.cb);
              node.addEventListener(elm.event, elm.cb);
            });
            break;
          case "object":
            (elm.selector as object).removeEventListener(elm.event, elm.cb);
            (elm.selector as object).addEventListener(elm.event, elm.cb);
            break;
          default:
            break;
        }
      });
    }
  };

  disconnectedCallback() {
    console.log("disconnected");
    this.subscriptions.forEach((elm) => UnSubscribe(elm));
  }
}
