import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import WriteGoal from "../views/WriteGoal.vue";
import KakaoCallback from "../views/KakaoCallback";
import CompleteGoal from "../views/CompleteGoal";
import BoardList from "../views/BoardList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/write_goal",
    name: "WriteGoal",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: WriteGoal,
  },
  {
    path: "/callback/kakao",
    name: "KakaoCallback",
    component: KakaoCallback,
  },
  {
    path: "/complete_goal",
    name: "CompleteGoal",
    component: CompleteGoal,
  },
  {
    path: "/board_list",
    name: "BoardList",
    component: BoardList,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 로그인 안하면 접근 불가 페이지로 가려하면
  const authRequiredPages = ["CompleteGoal"];

  const authRequired = authRequiredPages.includes(to.name);
  // const isLoggedIn = store.getters.isLoggedIn; 아래와 같은말
  // 요렇게도 씀 const{ isLoggedIn, allImages} = store.getters;
  const { getSelectList, getTitle } = store.getters;

  if (authRequired && !getSelectList.name && !getTitle) {
    // 인증해야되는데, 로그인 안했을 때
    next("/");
  } else {
    //인증해야하는데, 로그인 했을때
    next();
  }
});

export default router;
