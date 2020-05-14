import Vue from 'vue'
import App from './App.vue'
import mvyu from '../../ysz-ui'

Vue.config.productionTip = true
Vue.use(mvyu)

new Vue({
  render: h => h(App),
}).$mount('#app')
