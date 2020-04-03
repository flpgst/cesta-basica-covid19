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
              <v-form>
                <v-text-field
                  v-model="login"
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
                <v-btn @click.prevent="onSubmit()" color="primary">
                  Entrar
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import api from "../plugins/api";

export default {
  name: "login-form",
  data: () => ({
    login: "",
    password: ""
  }),
  methods: {
    onSubmit() {
      return api
        .criar("sessions", { login: this.login, password: this.password })
        .then(session => {
          localStorage.setItem("token", session.token);
          this.$router.push(`/${this.redirectUser(session.user.permission)}`);
          // return Promise.resolve(credenciais.usuario)
        })
        .catch(erro => Promise.reject(erro));
    },
    redirectUser(permission) {
      switch (permission) {
        case "admin":
          return "entrega";

        case "cadastro":
          return "cadastro";

        case "entrega":
          return "entrega";
      }
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
