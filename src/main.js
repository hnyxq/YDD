import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './api'
import store from './store/index'
import utils from './utils/lytic'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$api = api;

Vue.prototype.$utils = utils

/* 挂载 */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
