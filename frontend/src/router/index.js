import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Cadastro from "../views/Cadastro.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/lista_cadastrados",
    name: "Pessoas Cadastradas",
    component: () =>
      import(
        /* webpackChunkName: "pessoasCadastradas" */ "../views/ListaCadastrados.vue"
      )
  },
  {
    path: "/criar_usuario",
    name: "Criar Usuário",
    component: () =>
      import(
        /* webpackChunkName: "pessoasCadastradas" */ "../views/CriarUsuario.vue"
      )
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: Cadastro
  },
];

const router = new VueRouter({
  routes
});

export default router;
