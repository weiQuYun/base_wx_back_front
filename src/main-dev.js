import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'



import '@/assets/base.scss'  //全局样式
import '@/assets/fonts/iconfont.css' //1.引入字体图标 2.在class中"iconfont icon-user"等


import axios from 'axios'

//1.导入nprogress(顶部进度条)对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {post,fetch,patch,put} from './utils/http'


// import store from './store'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://127.0.0.1:60010/'; //配置的请求根路径
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post["Access-Control-Allow-Credentials"] = "true";
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
//有些接口需要token验证,此时需要在请求头中使用Authorization提供token令牌.
axios.interceptors.request.use(config => {  //←request就是请求拦截器
    NProgress.start();  //2.请求就展示进度条
    console.log('token'+ window.sessionStorage.getItem('token'));
    console.log('userId'+ window.sessionStorage.getItem('userId'));
    config.headers.Authorization = JSON.parse(window.sessionStorage.getItem('token'));
    config.headers.token = JSON.parse(window.sessionStorage.getItem('token'));
    config.headers.userId = JSON.parse(window.sessionStorage.getItem('userId'));
    return config  //最后必须返回
})
//http response 拦截器
//3.在reponse拦截器中,响应成功隐藏进度条 NProgress.done();
axios.interceptors.response.use(
    response => {
      NProgress.done();
      if(response.data.code !== 200){
       console.log(response.data.message);
      }
      return response.data;
    },
    error => {
      return Promise.reject(error)
    }
)




import VueQuillEditor from 'vue-quill-editor'    //引入富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor);






Vue.filter('dateFormat',function(originVal){
  const date = new Date(originVal);
  const y = date.getFullYear();
               //月份是从0开始得所以+1,padStart字符串得函数(总长度多少位,如果不足,用'0'来代替),
  const m = (date.getMonth() + 1 + '').padStart(2,'0');
  const d = (date.getDate()  + '').padStart(2,'0');

  const hh = (date.getHours()  + '').padStart(2,'0');
  const mm = (date.getMinutes() + '').padStart(2,'0');
  const ss = (date.getSeconds() + '').padStart(2,'0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`; 
})




import TreeTable from 'vue-table-with-tree-grid'  //cnpm i vue-table-with-tree-grid -S
Vue.component('tree-table',TreeTable);  //注册为全局可用的组件



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
