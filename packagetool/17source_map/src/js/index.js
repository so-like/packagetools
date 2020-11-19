// 引入css和less资源;
import '../css/iconfont.css';
import '../css/index.less';
import print from './print';

console.log("index.js文件被重新加载了");
print();
function add(a,b){
    return a+b
}
console.log(add(3,5));

if (module.hot){
    // 一旦module有hot属性则开启了HMR功能 则下面代码生效负责不生效
    module.hot.accept('./print.js',function(){
        // 监听print.js是否发生变化 一旦变化则其他模块不会发生变化
        // 只会讲print()再执行一次
        print();
    })
}
