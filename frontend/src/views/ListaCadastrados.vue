<template>
  <v-container v-if="pessoas" fluid class="pa-5">
    <v-row justify="start">
      <v-col cols="auto" cols-xs="12" class="title">
        Lista de todas as pessoas cadastradas no programa de cestas básicas
      </v-col>
    </v-row>
    <v-divider class="mb-5" />
    <v-row>
      <v-expansion-panels hover popout>
        <v-expansion-panel v-for="pessoa in pessoas" :key="pessoa.id">
          <v-expansion-panel-header
            :color="pessoa.entregue ? 'success' : 'error'"
            :class="[
              { 'white--text': !pessoa.entregue },
              'title',
              'font-weight-bold'
            ]"
          >
            {{ pessoa.nome }} | {{ pessoa.cpf }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row> Código: {{ pessoa.id }} </v-row>
            <v-row> Data de Cadastro: {{ pessoa.dataCadastro }} </v-row>
            <v-row>
              {{ pessoa.entregue ? "ENTREGUE" : "NÃO ENTREGUE" }}
            </v-row>
            <v-row v-if="pessoa.dataEntrega">
              Data de entrega: {{ pessoa.dataEntrega }}
            </v-row>
            <v-row> Cadastrado por: {{ pessoa.cadastradoPor }} </v-row>
            <v-row> Entregue por: {{ pessoa.entreguePor }} </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "lista-cadastrados",
  // mounted() {
  //   this.carregarPessoas();
  // },
  data: () => ({
    pessoa: 0,
    pessoas: [
      {
        id: 1,
        nome: "João",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: true,
        dataEntrega: "20/02/2020",
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      },
      {
        id: 2,
        nome: "Maria",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: true,
        dataEntrega: "20/02/2020",
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      },
      {
        id: 3,
        nome: "Claudio",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: false,
        dataEntrega: null,
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      },
      {
        id: 4,
        nome: "Carlos",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: true,
        dataEntrega: "20/02/2020",
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      },
      {
        id: 5,
        nome: "Matheus",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: true,
        dataEntrega: "20/02/2020",
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      },
      {
        id: 6,
        nome: "Clara",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: false,
        dataEntrega: null,
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      },
      {
        id: 7,
        nome: "Stephane",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: true,
        dataEntrega: "20/02/2020",
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      },
      {
        id: 8,
        nome: "Leôncio",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: true,
        dataEntrega: "20/02/2020",
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      },
      {
        id: 9,
        nome: "Minnie",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: true,
        dataEntrega: "20/02/2020",
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      },
      {
        id: 10,
        nome: "Mickey",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: true,
        dataEntrega: "20/02/2020",
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      },
      {
        id: 11,
        nome: "Batman",
        cpf: "105.389.719-75",
        dataCadastro: "01/04/2020",
        entregue: false,
        dataEntrega: null,
        cadastradoPor: "Joãozinho Gente Boa",
        entreguePor: "Carlos Caminhoneiro"
      }
    ]
  }),
  methods: {
    carregarPessoas() {
      this.$http
        .get("rota de carregar pessoas")
        .then(pessoas => {
          this.pessoas = pessoas;
        })
        .error(() => {
          /* exibir mensagem de erro? */
        });
    }
  }
};
</script>
