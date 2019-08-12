import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Layouts from './components/Layouts'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path: '/',  //访问路径
      name: 'Layouts', // 路径名
      component: Layouts //访问的组件,即访问‘/’,它会加载 Layouts 组件所有的内容。
    }
  ]
})
