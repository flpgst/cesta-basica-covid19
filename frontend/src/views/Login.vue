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
    <v-snackbar
        v-model="snackbarShow"
        top
        right
        :color="snackbarColor"
        :timeout=4000
    >
      {{ snackbarMessage }}
       <v-btn
        icon
        @click="snackbarShow = false"
      >
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </v-snackbar>
  </v-content>
</template>

<script>
import api from "../plugins/api";

export default {
  name: "login-form",
  data: () => ({
    login: "",
    password: "",
    snackbarColor: "error",
    snackbarMessage: "Login e senha não conferem",
    snackbarShow: false

  }),
  mounted() {
    this.autenticate(localStorage)
  },
  methods: {
    autenticate({login, password}) {
      if(!login || !password) return
      api.criar("sessions", { login, password })
      .then(session => {
        localStorage.setItem("token", session.token)
        this.$emit('autenticado',session.user.permission)
      })
    },
    onSubmit() {
      return api
        .criar("sessions", { login: this.login, password: this.password })
        .then(session => {
          localStorage.setItem("token", session.token)
          this.$emit('autenticado',session.user.permission)
        })
        .catch(() => this.snackbarShow = true)
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
