import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Layouts from './components/Layouts'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',  //访问路径
            name: 'Layouts', // 路径名
            component: Layouts //访问的组件,即访问‘/’,它会加载 Layouts 组件所有的内容。
        }
    ]
})
