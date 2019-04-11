import { createElement } from './vdom/createElement';
import { render } from './vdom/render';
import { mount } from './vdom/mount';
import { diff } from './vdom/diff';
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
const createApp = count => createElement('div', {
  attrs: {
    id: 'app',
    dataCount: count
  },
  children: [
    'this current count is: ',
    String(count),
    ...Array.from({ length: count }, () => createElement('img', {
      attrs: {
        src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
      }
    }))
  ]
})
let count = 0;
let vApp = createApp(count);
const $app = render(vApp);
// mount($app, document.getElementById('app'))
let $rootEle = mount($app, document.getElementById('app'))
console.log($app);

// only one
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

