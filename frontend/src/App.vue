<template>
  <v-app id="app">
    <Login v-if="!user" @autenticado="autenticar" />
    <v-container>
        <v-row>
        <v-col>
        <v-app-bar
        app
          elevate-on-scroll
          dark
          color="primary"
        >
          <v-toolbar-title>
          Entrega de Mantimentos | COVID-19
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
          <v-btn 
            v-if="permission === 'admin' || permission === 'cadastro'"
            :text="!isCadastro"
            depressed
            :color="isCadastro ? 'white indigo--text' : ''" 
            to="/cadastro"
          >
            Cadastro
          </v-btn>
          <v-btn 
            v-if="permission === 'admin' || permission === 'entrega'"
            :text="!isEntrega"
            depressed
            :color="isEntrega ? 'white indigo--text' : ''" 
            to="/entrega"
          >
            Entrega
          </v-btn>
          <v-btn 
            v-if="permission === 'admin'"  
            :text="!isPessoas"
            depressed
            :color="isPessoas ? 'white indigo--text' : ''" 
            to="/lista_cadastrados"
          >
              Pessoas Cadastradas
          </v-btn> 
          <v-btn 
            v-if="permission === 'admin'" 
            :text="!isUsuario"
            depressed
            :color="isUsuario ? 'white indigo--text' : ''" 
            to="/criar_usuario"
          >
              Criar Usuário
          </v-btn>
          <v-spacer />
          <v-btn 
            text
            depressed
            @click="logout"
          >
              Sair
          </v-btn>
          </v-toolbar-items>
        </v-app-bar>
        </v-col>
        </v-row>
        <v-row>
        <v-col>
          <router-view />
        </v-col>
        </v-row>
    </v-container>
  
  
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