// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"vdom/createElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = void 0;

var createElement = function createElement(tagName, _ref) {
  var attrs = _ref.attrs,
      children = _ref.children;
  return {
    tagName: tagName,
    attrs: attrs,
    children: children
  };
};

exports.createElement = createElement;
},{}],"vdom/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.renderElement = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// v1
var renderElement = function renderElement(_ref) {
  var tagName = _ref.tagName,
      attrs = _ref.attrs,
      children = _ref.children;
  // create element
  var $el = document.createElement(tagName);

  if (attrs) {
    var _arr = Object.entries(attrs);

    for (var _i = 0; _i < _arr.length; _i++) {
      var _arr$_i = _slicedToArray(_arr[_i], 2),
          k = _arr$_i[0],
          v = _arr$_i[1];

      $el.setAttribute(k, v);
    }
  }

  if (children) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var child = _step.value;
        $el.appendChild(render(child));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return $el;
}; // 实际的DOM中，有8种类型的节点
// simple 2 element <div></div> textNode 'hello world'
// v2


exports.renderElement = renderElement;

var render = function render(vNode) {
  // textNode 'hello world'
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }

  return renderElement(vNode);
};

exports.render = render;
},{}],"vdom/mount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mount = void 0;

// 用渲染出来的$app替换这个空div
// v1
var mount = function mount($node, $target) {
  $target.replaceWith($node);
  return $node;
};

exports.mount = mount;
},{}],"vdom/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffChildren = exports.diffAttrs = exports.diff = void 0;

var _render = require("./render");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var diff = function diff(oldVTree, newVTree) {
  if (!newVTree) {
    return function ($node) {
      $node.remove();
      return undefined;
    };
  } // node ===string


  if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
    if (oldVTree !== newVTree) {
      return function ($node) {
        var $newNode = (0, _render.render)(newVTree);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } else {
      return function ($node) {
        return $node;
      };
    }
  } // tagName


  if (oldVTree.tagName !== newVTree.tagName) {
    return function ($node) {
      var $newNode = (0, _render.render)(newVTree);
      $node.replaceWith($newNode);
      return $newNode;
    };
  } // oldtree newtree vdom
  // same tag
  // attrs and child some different


  var patchAttrs = diffAttrs(oldVTree.atts, newVTree.attrs);
  var patchChildren = diffChildren(oldVTree.children, newVTree.children);
  return function ($node) {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};

exports.diff = diff;

var diffAttrs = function diffAttrs(oldAttrs, newAttrs) {
  var patches = []; //set

  var _arr = Object.entries(newAttrs);

  var _loop2 = function _loop2() {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        k = _arr$_i[0],
        v = _arr$_i[1];

    patches.push(function ($node) {
      $node.setAttribute(k, v);
      return $node;
    });
  };

  for (var _i = 0; _i < _arr.length; _i++) {
    _loop2();
  } // remove attrs


  var _loop = function _loop(k) {
    if (!(k in newAttrs)) {
      patches.push(function ($node) {
        $node.removeAttribute(k);
        return $node;
      });
    }
  };

  for (var k in oldAttrs) {
    _loop(k);
  } // not understand


  return function ($node) {
    for (var _i2 = 0; _i2 < patches.length; _i2++) {
      var patch = patches[_i2];
      patch($node);
    }

    return $node;
  };
}; // len
// 


exports.diffAttrs = diffAttrs;

var diffChildren = function diffChildren(oldChildren, newChildren) {
  var childPatches = []; // oldVChildren.length === newVChildren.length
  // 从0到oldVChildren.length 调用diff(oldVChildren[i]， newVChildren[i])

  if (oldChildren) {
    oldChildren.forEach(function (oldChild, i) {
      childPatches.push(diff(oldChild, newChildren[i]));
    });
  } //oldVChildren.length > newVChildren.length


  var additionalPatches = [];

  if (newChildren) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop3 = function _loop3() {
        var addtionalChild = _step.value;
        additionalPatches.push(function ($node) {
          $node.appendChild((0, _render.render)(addtionalChild));
          return $node;
        });
      };

      for (var _iterator = newChildren.slice(oldChildren.length)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop3();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } // oldVChildren.length < newVChildren.length
  // 循环将为每个已经存在的子元素创建patches
  // 我们只需要创建其余的子节点，即newVChildren.slice(oldVChildren.length)


  return function ($parent) {
    // 
    // $parent.childNodes.forEach(($child, i) => {
    //   childPatches[i]($child);
    // });
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = zip(childPatches, $parent.childNodes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            patch = _step2$value[0],
            $child = _step2$value[1];

        patch($child);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    for (var _i3 = 0; _i3 < additionalPatches.length; _i3++) {
      var patch = additionalPatches[_i3];
      patch($parent);
    }

    return $parent;
  };
};

exports.diffChildren = diffChildren;

var zip = function zip(xs, ys) {
  var zipped = [];

  for (var i = 0; i < Math.min(xs.length, ys.length); i++) {
    zipped.push([xs[i], ys[i]]);
  }

  return zipped;
};
},{"./render":"vdom/render.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _createElement = require("./vdom/createElement");

var _render = require("./vdom/render");

var _mount = require("./vdom/mount");

var _diff = require("./vdom/diff");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// v1
// const vApp = {
//   tagName: "div",
//   attrs: { id: "app" }
// }
// v2
// const vApp = createElement('div', {
//   attrs: {
//     id: 'app'
//   },
//   children: [
//     createElement('img', {
//       attrs: {
//         src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
//       }
//     })
//   ]
// })
// v3 change
// const createApp = count => createElement('div', {
//   attrs: {
//     id: 'app',
//     dataCount: count
//   },
//   children: [
//     'this current count is: ',
//     String(count),
//     createElement('img', {
//       attrs: {
//         src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
//       }
//     })
//   ]
// })
// v4 diff
var createApp = function createApp(count) {
  return (0, _createElement.createElement)('div', {
    attrs: {
      id: 'app',
      dataCount: count
    },
    children: ['this current count is: ', String(count)].concat(_toConsumableArray(Array.from({
      length: count
    }, function () {
      return (0, _createElement.createElement)('img', {
        attrs: {
          src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif'
        }
      });
    })))
  });
};

var count = 0;
var vApp = createApp(count);
var $app = (0, _render.render)(vApp); // mount($app, document.getElementById('app'))

var $rootEle = (0, _mount.mount)($app, document.getElementById('app'));
console.log($app); // only one
// const newApp = createApp(1);
// const patch = diff(vApp, newApp);
// $rootEle = patch($rootEle);
// vApp = newApp;
// setInterval(() => {
//   const n = Math.floor(Math.random() * 10);
//   const vNewApp = createApp(n);
//   const patch = diff(vApp, vNewApp);
//   $rootEle = patch($rootEle);
//   vApp = vNewApp;
// }, 2000)
},{"./vdom/createElement":"vdom/createElement.js","./vdom/render":"vdom/render.js","./vdom/mount":"vdom/mount.js","./vdom/diff":"vdom/diff.js"}],"C:/Users/nearxu/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55108" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:/Users/nearxu/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.map