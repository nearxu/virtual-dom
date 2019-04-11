import { render } from './render';

export const diff = (oldVTree, newVTree) => {
  if (!newVTree) {
    return $node => {
      $node.remove();
      return undefined;
    }
  }
  // node ===string
  if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      return $node => {
        const $newNode = render(newVTree);
        $node.replaceWith($newNode);
        return $newNode;
      }
    } else {
      return $node => $node
    }
  }
  // tagName
  if (oldVTree.tagName !== newVTree.tagName) {
    return $node => {
      const $newNode = render(newVTree);
      $node.replaceWith($newNode);
      return $newNode;
    }
  }
  // oldtree newtree vdom
  // same tag
  // attrs and child some different
  const patchAttrs = diffAttrs(oldVTree.atts, newVTree.attrs);
  const patchChildren = diffChildren(oldVTree.children, newVTree.children);
  return $node => {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  }
}

export const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];
  //set
  for (const [k, v] of Object.entries(newAttrs)) {
    patches.push($node => {
      $node.setAttribute(k, v);
      return $node;
    })
  }
  // remove attrs
  for (const k in oldAttrs) {
    if (!(k in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(k);
        return $node;
      })
    }
  }

  // not understand
  return $node => {
    for (const patch of patches) {
      patch($node);
    }
    return $node;
  }
}

// len
// 
export const diffChildren = (oldChildren, newChildren) => {
  const childPatches = [];
  // oldVChildren.length === newVChildren.length
  // 从0到oldVChildren.length 调用diff(oldVChildren[i]， newVChildren[i])
  if (oldChildren) {
    oldChildren.forEach((oldChild, i) => {
      childPatches.push(diff(oldChild, newChildren[i]))
    });
  }

  //oldVChildren.length > newVChildren.length
  const additionalPatches = [];
  if (newChildren) {
    for (const addtionalChild of newChildren.slice(oldChildren.length)) {
      additionalPatches.push($node => {
        $node.appendChild(render(addtionalChild));
        return $node;
      })
    }
  }
  // oldVChildren.length < newVChildren.length
  // 循环将为每个已经存在的子元素创建patches
  // 我们只需要创建其余的子节点，即newVChildren.slice(oldVChildren.length)
  return $parent => {
    // 
    // $parent.childNodes.forEach(($child, i) => {
    //   childPatches[i]($child);
    // });
    for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
      patch($child)
    }
    for (const patch of additionalPatches) {
      patch($parent);
    }
    return $parent;
  }
}

const zip = (xs, ys) => {
  const zipped = [];
  for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }
  return zipped;
};
