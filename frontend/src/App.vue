<template>
  <v-app id="app">
    <Login v-if="!user" @autenticado="autenticar" />
    <div v-else>
    <div id="nav">
      <router-link v-if="permission === 'admin' || permission === 'cadastro'" to="/cadastro">Cadastro</router-link> |
      <router-link v-if="permission === 'admin'"  to="/lista_cadastrados">Pessoas Cadastradas</router-link> |
      <router-link v-if="permission === 'admin'" to="/criar_usuario">Criar Usuário</router-link> |
      <a href="#" @click="logout">Sair</a> 
    </div>
    <router-view />
    </div>
    
  </v-app>
</template>

<script>
import Login from "./views/Login"
import EventBus from './plugins/eventBus';

export default {
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
        }

    },
    logout() {
      localStorage.clear();
      window.location = "/";
    }
  },
  
  


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
