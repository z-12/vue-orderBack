/* 引入vue */
import Vue from 'vue'
/* 引入vue-router */
import Router from 'vue-router'

/* 引入根目录下的组件 */
import Home from '@/components/pages/index'

/* Vue全局使用Router */
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/', 
      name: 'home', 
      component: Home,
    }
  ]
})
