import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import EventBus from '../plugins/eventBus';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  
  {
    path: "/lista_cadastrados",
    name: "Pessoas Cadastradas",
    beforeEnter: (to, from, next) => {
      if (EventBus.permission !== 'admin') next({name: from.name})
      else next()
    },
    component: () =>
      import(
        /* webpackChunkName: "pessoasCadastradas" */ "../views/ListaCadastrados.vue"
      )
  },
  {
    path: "/criar_usuario",
    name: "Criar Usuário",
    beforeEnter: (to, from, next) => {
      if (EventBus.permission !== 'admin') next({name: from.name})
      else next()
    },
    component: () =>
      import(
        /* webpackChunkName: "criarUsuario" */ "../views/CriarUsuario.vue"
      )
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    beforeEnter: (to, from, next) => {
      if (EventBus.permission !== 'admin' && EventBus.permission !== 'cadastro') next({name: from.name})
      else next()
    },
    component: () =>
      import(
        /* webpackChunkName: "cadastro" */ "../views/Cadastro.vue"
      )
  }
];

const router = new VueRouter({
  routes
});


export default router;
