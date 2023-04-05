/*
  params - объект с параметрами для шаблонизатора
  events - массив объектов для eventListener { selector: '.root', event: 'click', cb: () => {} }
 */
export const RenderTo = (domNode, view, params = {}, events = []) => {
  if (!domNode) {
    throw new Error("RenderTo: bad selector");
  } else {
    domNode.innerHTML = view(params);
    events.forEach((elm) => {
      document.querySelectorAll(elm.selector).forEach((node) => {
        node.removeEventListener(elm.event, elm.cb);
        node.addEventListener(elm.event, elm.cb);
      });
    });
  }
};
