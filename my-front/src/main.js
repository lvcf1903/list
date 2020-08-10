// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
//axios拦截器
//axios.interceptors.request.use(function (params) {
  //请求拦截可以对参数进行处理
//   params.headers['token2']='123num'
//   return params;
// },function(error){
//   return Promise.reject(error);
// });

//响应拦截
//axios.interceptors.response.use(function(response){
 //对响应数据做些事
//  Indicator.close();
//  return response;
// },function(error){
//   return Promise.reject(error);
// });
// router.beforeEach((to, from, next) => {
//    const nextRouter=['member','order'];
//    let login=1//表示已经登录,0表示未登录
//    if(nextRouter.indexOf(to.name)>=0){//表示需要检查是否登录
//        if(login==1){
//          next();
//        }else{
//          router.push({name:'login'})
//        }
//    }else{
//      next();//不需要验证登录
//    }
  
// })
Vue.prototype.$axios = axios;
Vue.use(ElementUI)
Vue.config.productionTip = false
// Vue.filter('toFixed',function(val,arg,arg2){
//   return arg2+val.toFixed(arg)

// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
