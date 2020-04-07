import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登陆后返回值
    req:{}
  },
  getters:{
    getReq: state => state.req
  },
  mutations: {
    //set方法
    setReq(state,req){
      state.demoValue = req
    }
  },
  actions: {
  },
  modules: {
    //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
  }
})
