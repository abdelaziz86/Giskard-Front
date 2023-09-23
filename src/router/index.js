import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: AdminView,
      props: (route) => ({ success: route.query.success === "true" }),
    },
    {
      path: "/client",
      name: "client",
      component: () => import("../views/ClientView.vue"),
    },
    {
      path: "/addAvailability",
      name: "addAvailability",
      component: () => import("../views/AddAvailability.vue"),
    },
    {
      path: "/addReservation",
      name: "addReservation",
      component: () => import("../views/AddReservation.vue"),
    },
    {
      path: "/Reservations",
      name: "reservations",
      component: () => import("../views/Reservations.vue"),
    },
    {
      path: "/deleteReservation",
      name: "deleteReservation",
      component: () => import("../views/deleteReservation.vue"),
    },
  ],
});

export default router
