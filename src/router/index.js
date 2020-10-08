import Vue from 'vue'
import Router from 'vue-router'
import api from '@/components/api'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'api',
      component: api
    }
  ]
})
