import Vue from 'vue'
import VueRouter from 'vue-router'
import PlatesView from '../views/PlatesView.vue'
import WellsView from '../views/WellsView.vue'
import ExperimentsView from '../views/ExperimentsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PlatesView
  },
  {
    path: '/plates/:experiment_name_from_url',
    name: 'plates',
    component: PlatesView,
    props: true
  },
  {
    path: '/wells/:plate_name_from_url',
    name: 'wells',
    component: WellsView,
    props: true
  },
  {
    path: '/wells',
    name: 'all_wells',
    component: WellsView
  },

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
