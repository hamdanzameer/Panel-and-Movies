import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import SignUpComp from "./components/SignUpComp.vue";
import LoginComp from "./components/LoginComp.vue";
import forCheck from './components/forcheck.vue'
import MoviesPage from "./components/MoviesPage.vue"
import AdminMovies from "./components/AdminForMovies.vue"
import AdminLoginMovies from "./components/AdminMovieLogin.vue"
import DeleteMoviePage from "./components/DeleteMovie.vue"
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta :{ requireAuth :true}
  },
  {
    path: "/login",
    name: "LoginComp",
    component: LoginComp,
  },
  {
    path: "/signup",
    name: "SignUpComp",
    component: SignUpComp,
  },
  {
    path: "/forcheck",
    name: "forCheck",
    component: forCheck,
  },
  {
    path : "/movies",
  name : "MoviesPage",
  component : MoviesPage,
  },
  {
    path : "/adminloginmovies",
    name : "AdminLoginMovies",
    component : AdminLoginMovies,
  },
  {
    path : "/adminmovies",
    name : "AdminMovies",
    component : AdminMovies
  },
  {
  path : "/deletemovie",
  name : "DeleteMoviePage",
  component : DeleteMoviePage,
  },
];
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
