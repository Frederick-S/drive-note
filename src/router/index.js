import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Notes from '../views/Notes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  }
]

const router = new VueRouter({
  routes
})

export default router
