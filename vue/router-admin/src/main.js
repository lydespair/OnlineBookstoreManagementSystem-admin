import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import axios from 'axios'

// 导入样式
import './assets/css/bootstrap.css'
import './index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://localhost:8080/'

axios.interceptors.request.use(config=>{
  const token = localStorage.getItem('token')
  config.headers.token = token
  return config
});


Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
