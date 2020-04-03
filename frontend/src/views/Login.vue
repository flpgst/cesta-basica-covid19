<template>
  <v-content>
    <v-container fluid fill-height>
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
                <v-btn @click.prevent="onSubmit()" color="primary" block>
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
      :timeout="4000"
    >
      {{ snackbarMessage }}
      <v-btn icon @click="snackbarShow = false">
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
    login: null,
    password: null,
    snackbarColor: "error",
    snackbarMessage: "Login e senha não conferem",
    snackbarShow: false
  }),
  methods: {
    onSubmit() {
      return api
        .criar("sessions", { login: this.login, password: this.password })
        .then(({ token, user }) => {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          this.$emit("autenticado", user.permission);
        })
        .catch(() => (this.snackbarShow = true));
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