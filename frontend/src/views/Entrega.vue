<template>
  <v-container>
    <v-row>
      <v-col cols="auto" class="title">
        Confirmar Entrega
      </v-col>
    </v-row>
    <v-card>
      <v-card-text v-if="!showList">
        <v-col>
          <v-text-field
            v-model="cpfBusca"
            type="text"
            :rules="[(c) => c.length < 11 || cpf.isValid(c) || 'CPF Inválido']"
            :counter="11"
            label="CPF do beneficiário"
            required
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
      </v-card-text>
      <v-card-text v-if="showList">
        <v-col>
          <p>Nome: {{ pessoa.name }}</p>
          <p>CPF: {{ pessoa.cpf }}</p>
          <p
            >Endereço:
            {{
              pessoa.addr_street +
                " - " +
                pessoa.addr_number +
                " - " +
                pessoa.addr_district
            }}</p
          >
          <p>Quantidade: {{ pessoa.suply_quantity }}</p>
          <p>Última entrega em: {{ format(parseISO(entrega.created_at), 'dd-MM-yyyy') }}</p>
        </v-col>
        <v-col v-if="periodoEntrega > 30 ">
          <v-btn block color="primary" @click="onClickEntregar()">
            Confirmar Entrega
          </v-btn>
        </v-col>
        <v-col v-else>
          <v-alert type="error">
            Faltam {{ (30 - periodoEntrega) }} dias para a próxima entrega ser liberada!
          </v-alert>
          <v-btn block color="primary" @click="showList = false, cpfBusca = null">
            Buscar nova pessoa
          </v-btn>
        </v-col>
      </v-card-text>
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
import { format, parseISO, differenceInCalendarDays } from 'date-fns'
import { cpf } from 'cpf-cnpj-validator'
export default {
  data: () => ({
    cpf,
    cpfBusca: "",
    loading: false,
    showList: false,
    pessoa: null,
    entrega: null,
    snackbarShow: false,
    snackbarColor: "primary",
    snackbarMessage: null,
    periodoEntrega: null,
    format,
    parseISO,
    differenceInCalendarDays
  }),

  methods: {
    onClickBuscar() {
      this.$http
        .listar("people", {
          cpf: this.cpfBusca
        })
        .then(p => {
          this.pessoa = p.people;
          this.$http
            .listar("deliveries", {
              person_id: this.pessoa.id,
              last: true
            })
            .then(d => {
              this.entrega = d.deliveries;
              this.periodoEntrega = this.differenceInCalendarDays(new Date(), parseISO(d.deliveries.created_at))
              console.log('periodoEntrega :', this.periodoEntrega);
              this.showList = true
              
            })
            .catch(() => {
              this.snackbarMessage = "Erro ao buscar entregas";
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
        .criar("delivery", {
          person_id: this.pessoa.id
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
