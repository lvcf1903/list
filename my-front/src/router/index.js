import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import circle from '../pages/circle'
import index from '../pages/index'
import navbar from '../pages/navbar'
import todolist from '../pages/todolist'
import cart from '../pages/cart'
import filter from '../pages/filter'
import compued from '../pages/compued'
import mynum from '../components/mynum'
import login from '../pages/login'
import detail from '../pages/detail'
import pl from '../pages/pl'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/circle',
      name: 'circle',
      component: circle
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect:detail,
      children: [
        {
          path: '/detail',
          name: 'detail',
          component: detail,
        },
        {
          path: '/pl',
          name: 'pl',
          component: pl,
        }]
    },
    {
      path: '/navbar',
      name: 'navbar',
      component: navbar
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: todolist
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/filter',
      name: 'filter',
      component: filter
    },
    {
      path: '/compued',
      name: 'compued',
      component: compued
    },
    {
      path: '/mynum',
      name: 'mynum',
      component: mynum
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // {
    //   path: '/lodetailgin',
    //   name: 'detail',
    //   component:detail
    // },
    // {
    //   path: '/pl',
    //   name: 'pl',
    //   component:pl
    // }

  ]
})
