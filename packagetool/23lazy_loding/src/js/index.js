console.log("index.js被加载了");

import {mul} from './test'

// lazy_loading 懒加载是指一上来不加载 等触发一些事件后才会加载

document.getElementById("btn").onclick = function(){
  // 懒加载 可以将一些技术代码放到异步代码块中 懒加载也是会分割代码的
  // 预加载 prefetch 一上来就会加载我们的js文件 而当点击的时候就会快速加载剩下大部分时间
  // 正常加载可以认为是并行加载 加载的js代码越多就越慢 预加载prefetch是指浏览把其他的资源都加载完了，
  // 预加载的兼容性不是很好，用的时候一定要慎用
  // 等浏览器空闲了在偷偷加载
  import(/*webpackChunkName:'test',webpackPrefetch:true*/'./test')
    .then(({mul,count})=>{
      console.log(mul(5,6));
    })
}; 
