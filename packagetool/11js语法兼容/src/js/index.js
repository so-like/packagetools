// import '@babel/polyfill';
// 引入这个插件容量 js容量会变得非常大 因为它包含了所有es6语法的兼容

const add = (a,b) =>{
  return a + b;
}
console.log(add(1, 2));

const promise = new Promise(resolve =>{
  setTimeout(() =>{
    console.log("我要开动啦");
    resolve();
  },1000)
});
console.log(promise);
