import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import SignUpComp from "./components/SignUpComp.vue";
import LoginComp from "./components/LoginComp.vue";
import forCheck from './components/forcheck.vue'
const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
    meta :{ requireAuth :true}
  },
  {
    name: "LoginComp",
    component: LoginComp,
    path: "/login",
  },
  {
    name: "SignUpComp",
    component: SignUpComp,
    path: "/signup",
  },
  {
    name: "forCheck",
    component: forCheck,
    path: "/forcheck",
  }
];
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
