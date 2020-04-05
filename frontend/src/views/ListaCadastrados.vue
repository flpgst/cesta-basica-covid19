<template>
  <v-container v-if="pessoas">
    <v-row>
      <v-col cols="auto" class="title">
        Pessoas cadastradas
      </v-col>
    </v-row>
    <v-expansion-panels hover>
      <v-expansion-panel
        v-for="pessoa in pessoas"
        :key="pessoa.id"
        @click="listarEntregas(pessoa.id)"
      >
        <v-expansion-panel-header>
          {{ pessoa.name }} | {{ pessoa.cpf }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                Código: {{ pessoa.id }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                Data de Cadastro: {{ format(parseISO(pessoa.createdAt), 'dd-MM-yyyy') }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                Cadastrado por: {{ pessoa.user_creator.name }}
              </v-list-item-content>
            </v-list-item>
            <v-list-group v-if="entregas.length">
              <template v-slot:activator>
                <v-list-item-title>Entregas</v-list-item-title>
              </template>

              <v-list-item v-for="entrega in entregas" :key="entrega.id">
                <v-list-item-title>
                  Data da entrega: {{ format(parseISO(entrega.created_at), 'dd-MM-yyyy') }}
                </v-list-item-title>
                <v-list-item-title>
                  Entregue por: {{ entrega.user_deliverer.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list-group>
          <v-list-item v-else>
            Nenhuma entrega registrada
          </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>

import { format, parseISO } from 'date-fns'

export default {
  name: "lista-cadastrados",
  created() {
    this.carregarPessoas();
  },
  data: () => ({
    pessoa: 0,
    pessoas: null,
    entregas: [],
    format,
    parseISO
  }),
  methods: {
    carregarPessoas() {
      this.$http
        .listar("people")
        .then(p => {
          this.pessoas = p.people;
        })
        .catch(() => {
          this.snackbarMessage = "Erro ao carregar a lista de beneficiários";
        });
    },
    listarEntregas(id) {
      this.$http
        .listar("deliveries", {
          person_id: id
        })
        .then(d => {
          this.entregas = d.deliveries;
        })
        .catch(() => {
          this.snackbarMessage = "Erro ao carregar as entregas do beneficiário";
        });
    }
  }
};
</script>
