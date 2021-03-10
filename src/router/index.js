import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlayList from '../views/playlists/CreatePlayList.vue'
import PlayListDetails from '../views/playlists/PlayListDetails.vue'
import UserPlayLists from '../views/playlists/UserPlayLists.vue'
import {projectAuth, ProjectAuth} from '../firebase/config'

//authentication router

const authGuard = (to,from,next)=>{
  let user= projectAuth.currentUser
  if(!user){
    next({name:'Login'})
  }else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlists/create',
    name: 'CreatePlayList',
    component: CreatePlayList,
    beforeEnter: authGuard
  },
  {
    path: '/playlists/:id',
    name: 'PlayListDetails',
    component: PlayListDetails,
    beforeEnter: authGuard,
    props:true
  },
  {
    path: '/playlists/user',
    name: 'UserPlayLists',
    component: UserPlayLists,
    beforeEnter: authGuard
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
