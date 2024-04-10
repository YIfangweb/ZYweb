import { createRouter,createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("../views/map.vue"),
  },
  {
    path: "/userLocation",
    name: "userLocation",
    component: () => import("../views/userLocation.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/search.vue"),
  },
  {
    path: "/soup",
    name: "soup",
    component: () => import("../views/soup.vue"),
  },
  {
    path: "/forum",
    name: "forum",
    component: () => import("../views/forum.vue"),
  },
  {
    path: "/picture",
    name: "picture",
    component: () => import("../views/picture.vue"),
  },
  {
    path: "/me",
    name: "me",
    component: () => import("../views/me.vue"),
  },
  {
    path: "/make",
    name: "make",
    component: () => import("../views/make.vue"),
  },
  {
    path: "/museum",
    name: "museum",
    component: () => import("../views/museum.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router