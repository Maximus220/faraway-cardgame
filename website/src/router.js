import {createRouter, createWebHistory} from 'vue-router';
import index from './index.vue';
import game from "./components/game.vue"

const routes = [
  { path: '/', component: index },
  { path: '/game/:id', component: game}
]

const router = createRouter({
  history: createWebHistory(), 
  routes: routes,
}) 

export default router;