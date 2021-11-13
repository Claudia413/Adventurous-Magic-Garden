import Vue from "vue";
import store from "../store";
import Router from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import BlogPost from "../views/BlogPost.vue";
import Overview from "../views/Overview.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/blog/:uid",
      name: "blog-post",
      component: BlogPost,
    },
    {
      path: "/category/:tagid",
      name: "blog-category",
      component: Overview,
    },
    {
      path: "*",
      name: "everything",
      component: Home,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  store.state.showMobileMenu = false;
  next();
});

export default router;
