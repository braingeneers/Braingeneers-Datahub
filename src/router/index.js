import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WellsView from '../views/WellsView.vue'
import ExperimentsView from '../views/ExperimentsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/wells/:plate_name_from_url',
    name: 'wells',
    component: WellsView,
    props: true
  },
//   {
//     path: '/wells',
//     name: 'wells',
//     component: WellsView
//   },

  {
    path: '/experiments',
    name: 'experiments',
    component: ExperimentsView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

// const router = new VueRouter({
//   routes
// })
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

export default router
