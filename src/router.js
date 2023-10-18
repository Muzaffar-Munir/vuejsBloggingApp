import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesPage from './components/MoviesPage'
import Home from './components/Home'
import contact from './components/contactPage'
import AboutPage from './components/AboutPage'

Vue.use(VueRouter)

const routes = [
   {
      path: '/',
      name: 'Hello',
      component: Home
   },
   {
      path: '/about',
      name: 'about',
      component: AboutPage
   },
   {
      path: '/contact',
      name: 'contact',
      component: contact
   },
   {
      path: '/movies',
      name: 'movies',
      component: MoviesPage
   },
   {
      path: '/login',
      name: 'login',
      component: Vue.component('loginPage', require('./components/loginPage').default),
   },
   {
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: guardMyroute,
      component: Vue.component('dashboardLayout', require('./components/dashboard/dashboardLayout').default),
      children: [
         {
            path: 'home',
            name: 'home',
            component: Vue.component('homeComponent', require('./components/dashboard/homePage').default)
        },
      ]
   }
]

function guardMyroute(to, from, next)
{
   if (localStorage.getItem("currentUser") === null) {
      next({ name: 'login' })
    }
    next();
}

// eslint-disable-next-line no-new
const router = new VueRouter({
   routes
})

export default router