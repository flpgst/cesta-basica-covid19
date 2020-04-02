import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Cadastro from "../views/Cadastro.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
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
