import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import header from "@/components/header/Header";
// import content from "@/views/Content";

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: () => import("@/components/search/Search"),
      header: () => import("@/components/header/Header"),
      content: () => import("@/components/search/Search")
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/main',
    name: 'Main'
  },
  {
    path: '/message_test_page',
    name: 'MessageTestPage',
    component: () => import("@/components/testPageStore/MessageTestPage")
  },
  {
    path: '/chat/:id',
    name: 'Chats',
    components: {
      default: () => import("@/components/content/Content"),
      header: () => import("@/components/header/Header"),
      content: () => import("@/components/content/Content")
    }
  },
  {
    path: '/search',
    name: 'Search',
    components: {
      default: () => import("@/components/search/Search"),
      header: () => import("@/components/header/Header"),
      content: () => import("@/components/search/Search")
    }
  },
  {
    path: '/create',
    name: 'Create',
    components: {
      default: () => import("@/components/create/Create"),
      header: () => import("@/components/header/Header"),
      content: () => import("@/components/create/Create")
    }
  },
  {
    path: '/user/:userid',
    name: 'userPage',
    components: {
      default: () => import("@/components/user/UserPage"),
      header: () => import("@/components/header/Header"),
      content: () => import("@/components/user/UserPage"),
    }
  },
  {
    path: '/testpage',
    name: 'TestPage',
    components: {
      header: () => import("@/components/header/Header"),
      content: () => import("@/components/testPageStore/MessageTestPage")
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
