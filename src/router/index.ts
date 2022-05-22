import { createRouter, createWebHistory } from "vue-router";
import CalendarView from "@/views/CalendarView.vue";

export const routes = [
  {
    path: "/",
    name: "Calendar",
    component: CalendarView,
  },
  {
    path: '/:pathMatch(.*)*', redirect: (): { path: string } => {
      // the function receives the target route as the argument
      // we return a redirect path/location here.
      return { path: '/' }
    },createWebHistory
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
