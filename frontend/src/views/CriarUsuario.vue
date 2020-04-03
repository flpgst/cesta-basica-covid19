<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation @submit.prevent="salvarUsuario()">
      <v-card>
        <v-card-title class="font-weight-bold">
          Cadastrar Novo Usuário
        </v-card-title>
        <v-col>
          <v-text-field
            v-model="nome"
            label="Nome"
            :rules="[v => !!v]"
            validate-on-blur
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="login"
            label="Login"
            :rules="[v => !!v]"
            validate-on-blur
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="senha"
            label="Senha"
            type="password"
            :rules="[s => !!s]"
            validate-on-blur
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="senhaConfirmacao"
            label="Confirmar senha"
            type="password"
            :rules="[sc => !!sc && (sc === senha || !senha)]"
            validate-on-blur
          />
        </v-col>
        <v-col>
          <v-select
            v-model="userPermission"
            label="Permissão"
            :items="permissoes"
            item-text="name"
            item-value="id"
            :rules="[v => !!v]"
          />
        </v-col>
      </v-card>
      <v-row justify="end">
        <v-col md="auto">
          <v-btn color="primary" type="submit" block>
            SALVAR
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
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
  </v-container>
</template>

<script>
export default {
  name: "criar-usuario",
  mounted() {
    this.listarPermissioes();
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
            name: this.nome,
            login: this.login,
            password: this.senha,
            permission_id: this.userPermission
          })
          .then(() => {
            this.snackbarMessage = "Usuário cadastrado com sucesso.";
            this.snackbarColor = "success";
            this.snackbarShow = true;
            this.$refs.form.reset();
          })
          .catch(() => {
            this.snackbarMessage = "Erro ao cadastrar usuário";
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
      this.$http
        .listar("permissions")
        .then(p => (this.permissoes = p.permissions));
    }
  }
};
</script>
