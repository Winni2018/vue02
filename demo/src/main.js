// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css'
import axios from 'axios'
import common from './assets/js/common.js'
import http from './assets/js/http.js'
import 'babel-polyfill'
// excel
// 下载
import htmlToPdf from './assets/js/htmlToPdf'
Vue.use(htmlToPdf)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(common)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
