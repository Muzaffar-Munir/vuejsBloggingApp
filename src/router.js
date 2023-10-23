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
      // redirectTo: '/login',
      redirect: { name: 'login' },
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
      component: Vue.component('loginPage', require('./components/loginPage').default)
   },
   {
      path: '/loginMuzaffar',
      name: 'loginMuzaffar',
      component: Vue.component('loginMuzaffarPage', require('./components/loginMuzaffarPage').default)
   },
   {
      path: '/register',
      name: 'Sign Up',
      component: Vue.component('signUpPage', require('./components/signUpPage').default)
   },
   {
      path: '/verify/:username',
      name: 'Verify',
      component: Vue.component('VerificationPage', require('./components/verificationPage.vue').default)
   },
   {
      path: '/dashboard',
      name: 'dashboard',
      redirect: { name: 'home' },
      beforeEnter: guardMyroute,
      component: Vue.component('dashboardLayout', require('./components/dashboard/dashboardLayout').default),
      children: [
         {
            path: 'home',
            name: 'home',
            component: Vue.component('homeComponent', require('./components/dashboard/homePage').default)
         },
         {
            path: 'blog-create',
            name: 'blog create',
            component: Vue.component('BlogCreate', require('./components/dashboard/create').default)
         },
         {
            path: 'blog-edit/:id',
            name: 'blog create',
            component: Vue.component('BlogCreate', require('./components/dashboard/create').default)
         },
         {
            path: 'listUser',
            name: 'listUser',
            component: Vue.component('listUser', require('./components/dashboard/muzaffar/listUser').default)
         },
         {
            path: 'createUser',
            name: 'createUser',
            component: Vue.component('createUser', require('./components/dashboard/muzaffar/createUser').default)
         },
         {
            path: 'updateUser/:id',
            name: 'updateUser',
            component: Vue.component('createUser', require('./components/dashboard/muzaffar/createUser').default)
         },

      ]
   }
]

function guardMyroute(to, from, next) {
   if (localStorage.getItem("currentUser") === null) {
      console.log('iiiiiiiiii');
      next({ name: 'login' })
   }
   next();
}

// eslint-disable-next-line no-new
const router = new VueRouter({
   routes
})

export default router