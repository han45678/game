import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/game1',
    name: 'Game1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Game1.vue')
  },
  {
    path: '/external',
    name: 'external',
    component: () => import(/* webpackChunkName: "about" */ '../views/external.vue')
  },
  {
    path: '/game2',
    name: 'Game2',
    component: () => import(/* webpackChunkName: "about" */ '../views/Game2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
