import Vue from 'vue'
import VueRouter from 'vue-router'
import { TokenService } from './services/storage.service'

/**
  Lazy Loading/Code Splitting/Dynamic Components
 */

import Login from '@/views/auth/Login'
import Main from '@/layouts/Main'

// const Main     = () => import(/* webpackChunkName: "main" */ './layouts/Main')
// const Login    = () => import(/* webpackChunkName: "login" */ './views/auth/Login')
const Register = () => import(/* webpackChunkName: "register" */ './views/auth/Register')
const Home     = () => import(/* webpackChunkName: "home" */ './views/Home')
const About    = () => import(/* webpackChunkName: "about" */ './views/About')
const Contact  = () => import(/* webpackChunkName: "contact" */ './views/Contact')
const Profile  = () => import(/* webpackChunkName: "profile" */ './views/Profile')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: 'basic',
  routes: [
    { path: '*', redirect: '/home' },
    { path: '/', redirect: '/home'},
    { 
      path: '/', 
      component: Main,
      meta: { 
        requiresAuth: true 
      },
      children: [
        { path: 'home', component: Home },
        { path: 'about', component: About },
        { path: 'contact', component: Contact },
        { path: 'profile', component: Profile },
      ]
    },
    { 
      path: '/login',
      component: Login,
      meta: { 
        forVisitors: true 
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        forVisitors: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const forVisitors = to.matched.some(record => record.meta.forVisitors)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const loggedIn = !!TokenService.getUserInstance() && !!TokenService.getToken()

  if (forVisitors) {
    if (loggedIn)
      return
    else next()
  }
  else if (requiresAuth) {
    if (!loggedIn)
      next('/login')
    else next()
  }
})

export default router