<template>
  <v-container fluid class="pa-5">
    <v-row justify="start">
      <v-col cols="auto" cols-xs="12" class="title">
        Digite as informações do novo usuário nos campos abaixo
      </v-col>
    </v-row>
    <v-divider class="mb-5" />
    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="salvarUsuario()"
      class="pl-4"
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="nome"
            label="Nome"
            :rules="[v => !!v]"
            validate-on-blur
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="login"
            label="Login"
            :rules="[v => !!v]"
            validate-on-blur
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="senha"
            label="Senha"
            type="password"
            :rules="[s => !!s]"
            validate-on-blur
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="senhaConfirmacao"
            label="Confirmar senha"
            type="password"
            :rules="[sc => !!sc && (sc === senha || !senha)]"
            validate-on-blur
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select 
            v-model="userPermission"
            :items="permissoes"
            item-text="name"
            item-value="id"
            :rules="[ v => !!v ]"
          />
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col md="auto">
          <v-btn
            color="primary"
            type="submit"
            position="right"
            :block="$vuetify.breakpoint.smAndDown"
          >
            SALVAR
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar
      v-model="snackbarShow"
      top
      multi-line
      :color="snackbarColor"
      :timeout="4000"
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "criar-usuario",
  mounted() {
    this.listarPermissioes()
  },
  data: () => ({
    nome: "",
    login: "",
    senha: "",
    userPermission: null,
    permissoes: [],
    senhaConfirmacao: "",
    snackbarColor: "",
    snackbarMessage: "",
    snackbarShow: false
  }),
  methods: {
    salvarUsuario() {
      if (this.$refs.form.validate()) {
        this.$http
          .criar("users", {
            name: this.name,
            login: this.login,
            password: this.senha
          })
          .then(() => {
            this.snackbarMessage = "Usuário cadastrado com sucesso.";
            this.snackbarColor = "success";
            this.snackbarShow = true;
            this.$refs.form.reset();
          })
          .error(e => {
            this.snackbarMessage = e.error;
            this.snackbarColor = "error";
            this.snackbarShow = true;
          });
      } else {
        this.snackbarMessage =
          "Verifique os dados informados e tente novamente.";
        this.snackbarColor = "error";
        this.snackbarShow = true;
      }
    },
    listarPermissioes() {
      this.$http.listar('permissions')
        .then(p => this.permissoes = p.permissions)
    }
  }
};
</script>
