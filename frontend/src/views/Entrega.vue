<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="font-weight-bold">
        Entregas
      </v-card-title>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="cpfBusca"
              type="number"
              :rules="[v => !!v]"
              :counter="11"
              label="CPF do beneficiário*"
              required
              autofocus
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col>
          <v-btn
            @click="onClickBuscar()"
            color="primary"
            block
            :disabled="!cpfBusca || cpfBusca.length != 11"
            :loading="loading"
          >
            Buscar
          </v-btn>
        </v-col>
      </v-container>
      <v-container v-if="showList">
        <v-row>
          Dados do Beneficiário:
          <v-col cols="12">
            <span>Nome: {{ infoPessoa.name }}</span>
            <span
              >Endereço:
              {{
                infoPessoa.addr_street +
                  "." +
                  infoPessoa.addr_number +
                  " / " +
                  infoPessoa.addr_district
              }}</span
            >
            <span>Quantidade: {{ infoPessoa.suply_quantity }}</span>
          </v-col>
        </v-row>
        <v-row>
          Entregas Cadastradas:
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-list> </v-list>
          </v-col>
          <v-col cols="12">
            <v-btn class="ma-2" block color="success" @click="onClickEntregar()"
              >Cadastrar Entrega</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card>
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
  data: () => ({
    cpfBusca: null,
    loading: false,
    showList: false,
    infoPessoa: "",
    entregas: null,
    snackbarShow: false,
    snackbarColor: "primary",
    snackbarMessage: null
  }),

  methods: {
    onClickBuscar() {
      this.$http
        .listar("people", {
          cpf: this.cpfBusca
        })
        .then(p => {
          this.infoPessoa = p.people;
          console.log("this.infoPessoa :", this.infoPessoa);
          this.$http
            .listar("deliveries", {
              person_id: this.infoPessoa.id
            })
            .then(d => {
              this.entregas = d.deliveries;
              console.log("this.entregas :", this.entregas);
            })
            .catch(() => {
              this.snackbarMessage = "Erro ao buscar CPF";
              this.snackbarColor = "error";
              this.snackbarShow = true;
            });
        })
        .catch(() => {
          this.snackbarMessage = "Erro ao buscar CPF";
          this.snackbarColor = "error";
          this.snackbarShow = true;
        });
    },

    onClickEntregar() {
      this.$http
        .criar("deliveries", {
          person_id: this.infoPessoa.id
        })
        .then(() => {
          this.snackbarMessage = "Entrega Cadastrada!";
          this.snackbarColor = "success";
          this.snackbarShow = true;
          this.showList = false;
          this.cpfBusca = null;
        })
        .catch(() => {
          this.snackbarMessage = "Erro ao cadastrar entrega. Tente Novamente";
          this.snackbarColor = "error";
          this.snackbarShow = true;
        });
    }
  }
};
</script>
