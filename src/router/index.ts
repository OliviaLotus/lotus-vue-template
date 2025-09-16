import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
  { path: "/login", component: () => import("@/views/login/index.vue") }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes
});

export default router;
