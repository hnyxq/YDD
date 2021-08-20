import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import MyMuisc from '@/views/myMuisc'
import SongList from '@/views/songList'
import Singer from '@/views/singer'
import Rank from '@/views/rank'
import SongDetail from '@/views/details/songDetail'
import MvDetail from '@/views/details/mvDetail'
import AlbumDetail from '@/views/details/albumDetail'
import GdDetail from "@/views/details/gdDetail"
import SingerDetail  from "@/views/details/singerDetail"
import SearchDetail from "@/components/home/search/searchDetail"
import Login from "@/components/Login"

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: Home
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
      },
      {
        path: '/myMuisc',
        name: 'myMuisc',
        component: MyMuisc,
        meta:{
          needLogin:true
        }
      },
      {
        path: '/rank',
        name: 'rank',
        component: Rank
      },
      {
        path: '/songList',
        name: 'songList',
        component: SongList
      },
      {
        path: '/singer',
        name: 'singer',
        component: Singer
      },
      {
        path: '/songDetail',
        name: 'songDetail',
        component: SongDetail 
      },
      {
        path: '/mvDetail',
        name: 'mvDetail',
        component: MvDetail 
      },
      {
        path: '/albumDetail',
        name: 'albumDetail',
        component: AlbumDetail 
      },
      {
        path: '/gdDetail',
        name: 'gdDetail',
        component: GdDetail 
      },
      {
        path: '/singerDetail',
        name: 'singerDetail',
        component: SingerDetail 
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path:'/searchDetail',
        name:'searchDetail',
        component: SearchDetail
      }
    ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.needLogin){
    const token = localStorage.token
    if (token === null || token === undefined) next({ name: 'login' })
    next()
  }else{
    next()
  }
  
})

export default router