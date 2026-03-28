import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/:user', //temp name 'user' until we get data etc
      name: ':user',
      component: () => import('../components/Portfolio.vue'), //temporary until file structure decided
    },
    {
      path: '/:user/edit', //temp name 'user edit' until we get data etc
      name: ':user/editprofile', //this route is used for accessing place to edit user profile, should password lock.
      component: () => import('../components/PortfolioInputs.vue'), //temporary until file structure decided
    },
  ],
})

export default router
