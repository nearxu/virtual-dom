export const createElement = (tagName, { attrs, children }) => {
  return {
    tagName,
    attrs,
    children
  }
}