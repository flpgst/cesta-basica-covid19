<template>
  <v-app id="app">
    <Login v-if="!user" @autenticado="autenticar" />
    <div v-else>
        <v-app-bar
          app
          fixed
          dark
          color="primary"
        >
          <v-spacer />
          <v-btn 
            v-if="permission === 'admin' || permission === 'cadastro'"
            x-large
            :text="!isCadastro"
            :color="isCadastro ? 'indigo lighten-5 indigo--text' : ''" 
            to="/cadastro"
          >
            <span :class="`pt-${isCadastro ? 0 : 7}`">
              Cadastro
            </span>
          </v-btn>
          <v-btn 
            v-if="permission === 'admin' || permission === 'entrega'"
            x-large 
            :text="!isEntrega"
            :color="isEntrega ? 'indigo lighten-5 indigo--text' : ''" 
            to="/entrega"
          >
            <span :class="`pt-${isEntrega ? 0 : 7}`">
              Entrega
            </span>
          </v-btn>
          <v-btn 
            v-if="permission === 'admin'"  
            x-large 
            :text="!isPessoas"
            :color="isPessoas ? 'indigo lighten-5 indigo--text' : ''" 
            to="/lista_cadastrados"
          >
            <span :class="`pt-${isPessoas ? 0 : 7}`">
              Pessoas Cadastradas
            </span>
          </v-btn> 
          <v-btn 
            v-if="permission === 'admin'" 
            x-large 
            :text="!isUsuario"
            :color="isUsuario ? 'indigo lighten-5 indigo--text' : ''" 
            to="/criar_usuario"
          >
            <span :class="`pt-${isUsuario ? 0 : 7}`">
              Criar Usuário
            </span>
          </v-btn>
          <v-spacer />
          <v-btn 
            x-large 
            text 
            @click="logout"
          >
            <span>
              Sair
            </span>
          </v-btn> 
        </v-app-bar>
      <router-view />
    </div>
  </v-app>
</template>

<script>
import Login from "./views/Login"
import EventBus from './plugins/eventBus';

export default {
  name: 'app',
  components: {
    Login
  },
  data: () => ({
    autenticado: false,
    permission: null,
    user: null
  }),
   created() {
    this.getUser();
  },
  computed: {
    isCadastro() {
      return this.$route.path === "/cadastro"
    },
    isEntrega() {
      return this.$route.path === "/entrega"
    },
    isPessoas() {
      return this.$route.path === "/lista_cadastrados"
    },
    isUsuario() {
      return this.$route.path === "/criar_usuario"
    },
  },
  methods: {
    getUser(){
      this.user = localStorage.getItem('user')
      if(!this.user) return
      EventBus.permission = this.permission = JSON.parse(localStorage.user).permission
    },
    autenticar(permission) {
        this.permission = permission
        this.user = localStorage.getItem('user')
        EventBus.permission = permission
        switch(permission) {
          case "admin":
            this.$router.push("lista_cadastrados")
            break;
          case "cadastro":
            this.$router.push("cadastro")
            break;
          case "entrega":
            this.$router.push("entrega")
            break;

        }
    },
    logout() {
      localStorage.clear();
      window.location = "/";
    }
  }
}
</script>

<style>
  .active-button {
    background-color: purple;
  }
</style>