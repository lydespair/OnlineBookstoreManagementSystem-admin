import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/MyLogin'
import Home from '@/components/MyHome'

import Users from '@/components/menus/MyUsers'
import Books from '@/components/menus/MyBooks'
import Orders from '@/components/menus/MyOrders'
import Rights from '@/components/menus/MyRights'
import Settings from '@/components/menus/MySettings'
import OrderItem from '@/components/order/MyOrderDetail'
import Welcome from '@/components/menus/MyWelcome'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login},
    { path: '/home', component: Home, redirect: '/home/welcome', children: [
      { path: 'welcome', component: Welcome},
      { path: 'users', component: Users},
      { path: 'books', component: Books},
      { path: 'orders', component: Orders},
      { path: 'rights', component: Rights},
      { path: 'settings', component: Settings},
      { path: 'orderItem/:orderId', component: OrderItem, props: true}
    ]}
  ]
})

router.beforeEach(function(to, from, next) {
  if (to.path !== '/login') {
    const token = localStorage.getItem('token')
    if (token) next()
    else next('/login')

  } else {
    next()
  }
})
export default router