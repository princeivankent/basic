import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from './layouts/Main'
import Login from './views/Login'
import Home from './views/Home'
import About from './views/About'
import Contact from './views/Contact'
import Profile from './views/Profile'

// Lazy Loading: will only render based on route (Dynamic Imports)
// const Home = () => import('./views/Home')
// const About = () => import('./views/About')

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
  ]
})

// Route Guards
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.forVisitors)) {
//     if (Vue.auth.isAuthenticated()) {
//       next('/courses')
//     } 
//     else next()
//   } 
//   else if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!Vue.auth.isAuthenticated()) {
//       next('/login')
//     }
//     else next()
//   }
// })

export default router