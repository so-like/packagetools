import '../css/index.css';
import { mul } from './mul';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(mul(5,8));
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

// 注册serviceWork处理兼容性问题

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('servicework注册成功');
      })
      .catch(() => {
        console.log('servicework注册失败');
      });
  });
}
