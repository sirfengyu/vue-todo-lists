import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//  第一种写法
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 第二种写法
// new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App></App>',
//   components: {
//       App
//   }
// })

// 第三种写法
// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })
