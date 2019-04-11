// v1
export const renderElement = ({ tagName, attrs, children }) => {
  // create element
  const $el = document.createElement(tagName);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      $el.setAttribute(k, v);
    }
  }
  if (children) {
    for (const child of children) {
      $el.appendChild(render(child));
    }
  }
  return $el;
}

// 实际的DOM中，有8种类型的节点
// simple 2 element <div></div> textNode 'hello world'
// v2
export const render = (vNode) => {
  // textNode 'hello world'
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }
  return renderElement(vNode);
}