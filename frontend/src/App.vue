<template>
  <v-app id="app">
    <Login v-if="!autenticado" @autenticado="autenticar" />
    <div v-else>
      <div id="nav">
        <router-link v-if="permission === 'admin'" to="/lista_cadastrados"
          >Pessoas Cadastradas</router-link
        >
        |
        <router-link
          v-if="permission === 'admin' || permission === 'cadastro'"
          to="/cadastro"
          >Cadastro</router-link
        >
        |
        <router-link
          v-if="permission === 'admin' || permission === 'entrega'"
          to="/entrega"
          >Entrega</router-link
        >
        |
        <router-link v-if="permission === 'admin'" to="/criar_usuario"
          >Criar Usuário</router-link
        >
        |
        <router-link to="/" @click="logout">Sair</router-link>
      </div>
      <router-view />
    </div>
  </v-app>
</template>

<script>
import Login from "./views/Login";
import EventBus from "./plugins/eventBus";

export default {
  components: {
    Login
  },
  data: () => ({
    autenticado: false,
    permission: null
  }),
  methods: {
    autenticar(permission) {
      this.permission = permission;
      this.autenticado = true;
      EventBus.permission = permission;
      switch (permission) {
        case "admin":
          this.$router.push("lista_cadastrados");
          break;
        case "cadastro":
          this.$router.push("cadastro");
          break;
      }
    },
    logout() {
      localStorage.clear();
      this.autenticado = false;
      window.location("/");
    }
  }
};
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
