

// 通过js代码让某个文件单独打包成一个chunk
// import动态导入语法 能将某个文件单独打包
import(/*webpackChunkName:'test'*/'./test')
  .then(({mul,count})=>{
    // eslint-disable-next-line
    console.log(mul(8,6));
  })
  .catch(()=>{
    // eslint-disable-next-line
    console.log("文件加载失败");
  })

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

