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
    component: ExperimentsView,
    meta: {
        title: 'Home Page - Braingeneers Hub',
        metaTags: [
          {
            name: 'description',
            content: 'The home page'
          },
          {
            property: 'og:description',
            content: 'The home page'
          }
        ]
      }
  },
  {
    path: '/plates/:experiment_name_from_url',
    name: 'plates',
    component: PlatesView,
    props: true,
    meta: {
        title: 'Experiments - Braingeneers Hub',
        metaTags: [
          {
            name: 'description',
            content: 'experiments page'
          },
          {
            property: 'og:description',
            content: 'experiments page'
          }
        ]
      }
  },
  {
    path: '/wells/:plate_name_from_url',
    name: 'wells',
    component: WellsView,
    props: true,
    meta: {
        title: 'Wells - Braingeneers Hub',
        metaTags: [
          {
            name: 'description',
            content: 'view wells'
          },
          {
            property: 'og:description',
            content: 'wells page'
          }
        ]
      }
  },
  {
    path: '/wells',
    name: 'all_wells',
    component: WellsView,
    meta: {
        title: 'Wells - Braingeneers Hub',
        metaTags: [
          {
            name: 'description',
            content: 'view wells'
          },
          {
            property: 'og:description',
            content: 'wells page'
          }
        ]
      }
  },

  {
    path: '/experiments',
    name: 'experiments',
    component: ExperimentsView,
    meta: {
        title: 'Experiments - Braingeneers Hub',
        metaTags: [
          {
            name: 'description',
            content: 'experiments page'
          },
          {
            property: 'og:description',
            content: 'experiments page'
          }
        ]
      }
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


// ... 

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
    // `/nested`'s will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  
    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  
    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) {
      document.title = nearestWithTitle.meta.title;
    } else if(previousNearestWithMeta) {
      document.title = previousNearestWithMeta.meta.title;
    }
  
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  
    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();
  
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');
  
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
  
      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');
  
      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
  
    next();
  });
  
  // ...