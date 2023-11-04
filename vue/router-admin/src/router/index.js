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
import AdminLogin from '@/components/AdminLogin'
import Index from '@/components/menus/Index'
import UserHome from '@/components/menus/UserHome'
import Cart from '@/components/menus/Cart'
import Order from '@/components/menus/Order'
import User from '@/components/menus/User'
import OrderDetail from '@/components/order/OrderDetail'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login},
    { path: '/adminlogin', component: AdminLogin},
    { path: '/home', component: Home, redirect: '/home/welcome', children: [
      { path: 'welcome', component: Welcome},
      { path: 'users', component: Users},
      { path: 'books', component: Books},
      { path: 'orders', component: Orders},
      { path: 'rights', component: Rights},
      { path: 'settings', component: Settings},
      { path: 'orderItem/:orderId/:userId', component: OrderItem, props: true}
    ]},
    { path: '/index', component: Index, redirect: '/index/userhome', children: [
      { path: 'userhome', component: UserHome},
      { path: 'order', component: Order},
      { path: 'cart', component: Cart},
      { path: 'user', component: User},
      { path: 'orderDetail/:orderId', component: OrderDetail, props: true}
    ]}
  ]
})

router.beforeEach(function(to, from, next) {
  if (to.path !== '/login' && to.path !== '/adminlogin') {
    const token = localStorage.getItem('token')
    if (token) next()
    else next('/login')

  } else {
    next()
  }
})
export default router