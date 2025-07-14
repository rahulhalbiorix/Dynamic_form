import AddNewFormPage from "@/Views/AddNewFormPage.vue";
import HomePage from "@/Views/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: { name: "HomePage" } },
    { path: "/home", name: "HomePage", component: HomePage },
    { path: "/add-form", name: "AddNewForm", component: AddNewFormPage },
  ],
});
