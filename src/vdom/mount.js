
// 用渲染出来的$app替换这个空div
// v1
export const mount = ($node, $target) => {
  $target.replaceWith($node);
  return $node;
}
