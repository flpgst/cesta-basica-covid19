<template>
  <v-container>
    <v-row>
      <v-col v-if="!showForm" cols="auto" class="title">
        Pesquisar Cadastro
      </v-col>
      <v-col v-else cols="auto" class="title">
         Cadastrar Novo Beneficiário
      </v-col>
    </v-row>
    <v-card v-if="!showForm">
        <v-card-text>
        <v-col>
            <v-text-field
              v-model="cpfBusca"
              @input="onChangeBuscar()"
              type="text"
              :rules="[c => c.length < 11 || cpf.isValid(c) || 'CPF Inválido']"
              :counter="11"
              label="CPF do beneficiário"
              autofocus
            ></v-text-field>
        </v-col>
        <v-col>
          <v-btn
            @click="onClickBuscar()"
            color="primary"
            block
            :disabled="!cpfBusca || !cpf.isValid(cpfBusca)"
            :loading="loading"
          >
            Buscar
          </v-btn>
        </v-col>
        <v-alert v-if="cpfCadastrado" type="warning"
          >O CPF {{ cpfCadastrado }} já está cadastrado.</v-alert
        >
        </v-card-text>
    </v-card>

    <v-form ref="form" lazy-validation @submit.prevent="onClickSave()">
      <v-card v-if="showForm">
            <v-col>
              <v-text-field
                v-model="nome"
                :rules="[v => !!v]"
                label="Nome"
                required
                autofocus
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model="cpfBusca"
                type="text"
                :hint="'Insira apenas números'"
                persistent-hint
                :rules="[c => cpf.isValid(c) || 'CPF Inválido']"
                :counter="11"
                label="CPF"
                required
              ></v-text-field>
            </v-col>
            <v-row class="mx-auto">
            <v-col cols="10">
              <v-text-field
                v-model="endereco_rua"
                :rules="[v => !!v]"
                label="Logradouro (Rua, Avenida, etc.)"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="2">
              <v-text-field
                v-model="endereco_numero"
                :rules="[v => !!v]"
                label="Nº"
                required
              ></v-text-field>
            </v-col>
            </v-row>
            <v-col>
              <v-text-field
                v-model="endereco_bairro"
                :rules="[v => !!v]"
                label="Bairro"
                required
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model="qtde_pessoas"
                type="number"
                :rules="[v => !!v]"
                label="Quantidade de pessoas na família"
                required
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model="qtde_cestas"
                type="number"
                :rules="[v => !!v]"
                label="Quantidade de cestas básicas concedidas"
                required
              ></v-text-field>
            </v-col>

            <v-col>
              <v-btn color="primary" type="submit" block :loading="loading">
                Salvar
              </v-btn>
            </v-col>
        
      </v-card>
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

import {cpf} from 'cpf-cnpj-validator'

export default {
  data: () => ({
    form_valid: false,
    showForm: false,
    cpfBusca: "",
    cpfCadastrado: null,
    nome: null,
    endereco_rua: null,
    endereco_numero: null,
    endereco_bairro: null,
    qtde_pessoas: null,
    qtde_cestas: null,
    loading: false,
    snackbarShow: false,
    snackbarColor: "primary",
    snackbarMessage: null,
    cpf
  }),

  methods: {
    onChangeBuscar() {
      if (this.cpfCadastrado) this.cpfCadastrado = null;
    },
    onClickBuscar() {
      this.$http
        .listar("people", {
          cpf: this.cpfBusca
        })
        .then(p => {
          this.cpfCadastrado = p.people.cpf;
        })
        .catch(() => {
          this.snackbarMessage = "CPF apto para cadastro!";
          this.snackbarColor = "info";
          this.snackbarShow = true;
          this.showForm = true;
        });
    },
    onClickSave() {
      if (this.$refs.form.validate()) {
        this.$http
          .criar("person", {
            name: this.nome,
            cpf: this.cpfBusca,
            family_members: this.qtde_pessoas,
            addr_street: this.endereco_rua,
            addr_number: this.endereco_numero,
            addr_district: this.endereco_bairro,
            suply_quantity: this.qtde_cestas
          })
          .then(() => {
            this.snackbarMessage = "Beneficiário cadastrado com sucesso.";
            this.snackbarColor = "success";
            this.snackbarShow = true;
            this.$refs.form.reset();
          })
          .catch(() => {
            this.snackbarMessage = "Erro ao cadastrar beneficiário";
            this.snackbarColor = "error";
            this.snackbarShow = true;
          });
      }
    }
  }
};
</script>
