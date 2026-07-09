import { createRouter, createWebHistory } from "vue-router";
import ProomView from "../pages/ProomView.vue";

const routes = [
  {
    path: "/",
    name: "proom",
    component: ProomView,
  },
  {
    path: "/select",
    name: "select",
    component: () => import("../pages/SelectView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
