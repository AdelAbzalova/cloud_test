import { createRouter, createWebHistory } from "vue-router";
import AppStart from "../components/Start.vue";
import AppCreate from "../components/Create.vue";

const routes = [
  {
    path: "/",
    name: "start",
    component: AppStart,
    alias: "/",
  },
  {
    path: "/create",
    name: "create",
    component: AppCreate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
