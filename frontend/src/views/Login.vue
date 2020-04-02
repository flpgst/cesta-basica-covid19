<template>
  <v-content>
    <v-container fluid fill-height class="login-page">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                Cesta Básica | COVID-19
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <form @submit.prevent="onSubmit">
                <v-text-field
                  v-model="username"
                  name="login"
                  label="Usuário"
                  type="text"
                />
                <v-text-field
                  v-model="password"
                  name="password"
                  label="Senha"
                  type="password"
                />
                <v-btn type="submit" color="primary">
                  Entrar
                </v-btn>
              </form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "login-form",
  data: () => ({
    username: "",
    password: ""
  }),
  methods: {
    onSubmit() {
      const password = btoa(this.password);
      return this.$http
        .criar("rota de login", { username: this.username, password })
        .then(async credenciais => {
          this.vuex = credenciais;
          /* Joga pro localStorage */
          // armazenarInformacoes(credenciais)
          // await carregarAlocacoes()
          // return Promise.resolve(credenciais.usuario)
        })
        .catch(error => Promise.reject(error));
    }
  }
};
</script>

<style scoped>
/* .login-page { 
        background: url('../assets/login.jpg') no-repeat center center;
        background-size: 100% 100%;
    } */
</style>
