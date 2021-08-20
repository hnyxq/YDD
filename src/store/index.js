import Vue from 'vue'
import Vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
   // 菜单切换
    activeIndex:'/home',
    // 入驻歌手
    rzSingerList:[],
    // 用户信息
    userInfo:{
      userId:"",
      token:"",
      img:""
    },
    //播放列表
    bfList:[],
  },
  mutations: {
    setActiveIndex(state,index) {
        state.activeIndex = index;
    },
    setUserInfo(state,userInfo) {
      state.userInfo = userInfo
    },
    setIsLogin(state,bool) {
      state.isLogin = bool;
    },
    setBfList(state,bfList) {
      state.bfList = bfList;
    },
  //刷新
    initUser(state){
      if(state.userInfo.token === "" && localStorage.token){
        state.userInfo.userId = localStorage.userId,
        state.userInfo.token = localStorage.token,
        state.userInfo.img = localStorage.img,
        state.isLogin = true
      }
    },
  //退出登录
   logout(state){
     state.userInfo.userId = "";
     state.userInfo.token = "";
     state.userInfo.img = "";
     state.isLogin = false;
     localStorage.clear();
     location.reload()
   }
  },
  actions: {
    setActiveIndex(content){
      content.commit('setActiveIndex',index)
    },
    setUserInfo(content){
      content.commit('setUserInfo',userInfo)
    },
    setIsLogin(content) {
      content.commit('setIsLogin',bool)
    },
    setBfList(content) {
      content.commit('setBfList',bfList)
    },
  }
})

