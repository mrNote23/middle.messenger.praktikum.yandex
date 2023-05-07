/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { JSDOM } = require("jsdom");
const register = require("@babel/register").default;

register({ extensions: [".ts", ".js"] });

const dom = new JSDOM('<div id="root"><div>', { url: "http://localhost" });

global.window = dom.window;
global.document = dom.window.document;
global.window.history = dom.window.History;

global.HTMLElement = class {
  innerHtml = "";
};

global.XMLHttpRequest = class {
  status = 200;
  onload = () => null;

  setRequestHeader = (headers) => null;

  getResponseHeader = (header) => {
    return "no headers";
  };

  open = (method, url) => null;

  send = (data) => {
    this.status = 200;
    this.response = "OK";
    this.onload();
  };
};
