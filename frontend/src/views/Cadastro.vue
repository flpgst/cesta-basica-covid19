<template>
    <v-container>
        <v-card elevation="6" class="mx-auto" v-if="!showForm">
            <v-card-title class="font-weight-bold">
                Pesquisar Cadastro
            </v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="cpfBusca"
                            type="number"
                            :rules="[v => !!v || 'Campo obrigatório']"
                            :counter="11"
                            label="CPF do beneficiário*"
                            required
                            autofocus
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row align="start">
                    <v-col class="text-center" cols="3">
                        <v-btn
                            @click="onClickBuscar()"
                            color="primary"
                            :disabled="!cpfBusca || cpfBusca.length != 11"
                            :loading="loading">
                            Buscar
                        </v-btn>
                    </v-col>
                    <v-col class="text-center" cols="3">
                        <v-btn
                            v-if="showBtnCadastrar"
                            @click="onClickCadastrar()"
                            color="success">
                            Cadastrar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <v-card elevation="6" class="mx-auto" v-if="showForm">
            <v-card-title class="font-weight-bold">
                Formulário de Cadastro
            </v-card-title>
                <v-form v-model="form_valid">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field
                                    v-model="nome"
                                    :rules="[v => !!v || 'Campo obrigatório']"
                                    label="Nome da Pessoa Beneficiada*"
                                    required
                                    autofocus
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="cpf"
                                    type="number"
                                    :hint="'Insira apenas números'"
                                    persistent-hint
                                    :rules="[v => !!v || 'Campo obrigatório', v => v.length <= 11 || 'CPF Incorreto']"
                                    :counter="11"
                                    label="CPF do beneficiado*"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6" >
                                <v-text-field
                                    v-model="endereco"
                                    :rules="[v => !!v || 'Campo obrigatório']"
                                    label="Endereço do beneficiado (Rua, nº)*"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6" >
                                <v-text-field
                                    v-model="bairro"
                                    :rules="[v => !!v || 'Campo obrigatório']"
                                    label="Bairro do Beneficiado*"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6" >
                                <v-text-field
                                    v-model="qtde_pessoas"
                                    type="number"
                                    :rules="[v => !!v || 'Campo obrigatório']"
                                    label="Quantidade de pessoas na família*"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6" >
                                <v-text-field
                                    v-model="qtde_cestas"
                                    type="number"
                                    :rules="[v => !!v || 'Campo obrigatório']"
                                    label="Quantidade de cestas básicas concedidas*"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6" >
                                <v-select
                                    v-model="serv_auth"
                                    :items="servidores_autorizados"
                                    :rules="[v => !!v || 'Campo obrigatório']"
                                    label="Servidor Público autorizado*"
                                    required
                                ></v-select>
                            </v-col>

                            <v-col class="text-center" cols="12">
                                <v-btn
                                    @click="onClickSave()"
                                    color="primary"
                                    :loading="loading">
                                    Salvar
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
        </v-card>

        <v-snackbar
            v-model="showMessage"
            top right
            :color="colorMessage"
            :timeout="3000">
            {{ message }}
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        form_valid: false,
        showForm: false,
        showBtnCadastrar: false,
        cpfBusca: '',
        nome: '',
        cpf: '',
        endereco: '',
        bairro: '',
        qtde_pessoas: null,
        qtde_cestas: null,
        serv_auth: null,
        servidores_autorizados: [
            { value: 1, text:'Jackson Carlos da Silva - PGM' }, 
            { value: 2, text:'Elisete Furtado Cardoso - SME' }
        ],
        loading: false,
        showMessage: false,
        colorMessage: 'primary',
        message: ''
    }),

    methods: {
        onClickBuscar() {
            console.log('Clicou para Buscar o CPF');
            console.log('this.cpfBusca :', this.cpfBusca);
            //Promise para verificar se CPF já existe
            //Caso não exista .then()
            this.message = 'CPF não encontrado'
            this.colorMessage = 'error'
            this.showMessage = true
            this.showBtnCadastrar = true
        },

        onClickCadastrar() {
            console.log('Cliclou para cadastrar!');
            this.cpf = this.cpfBusca
            this.showForm = true
        },

        onClickSave() {
            if (this.form_valid) { //Se Form está validado
                if (this.cpf.length != 11) { //Se CPF não possui 11 digitos
                    this.message = 'Verifique o CPF informado'
                    this.colorMessage = 'error'
                    this.showMessage = true
                } else if (this.qtde_pessoas < 1) { //Se qtde_pessoas for menor que 1
                    this.message = 'Verifique a quantidade de pessoas na família'
                    this.colorMessage = 'error'
                    this.showMessage = true
                } else if (this.qtde_cestas < 1) {//Se qtde_cestas for menor que 1
                    this.message = 'Verifique a quantidade de cestas concedidas'
                    this.colorMessage = 'error'
                    this.showMessage = true
                } else {//Senão, tudo certo para salvar()
                    this.saveBeneficiario();
                }                
            } else {
                this.message = 'Verifique os campos obrigatórios!'
                this.colorMessage = 'error'
                this.showMessage = true
            }
        },

        saveBeneficiario() {
            console.log('form_valid :', this.form_valid);
            console.log('nome :', this.nome);
            console.log('cpf :', this.cpf);
            console.log('endereco :', this.endereco);
            console.log('bairro :', this.bairro);
            console.log('qtde_pessoas :', this.qtde_pessoas);
            console.log('qtde_cestas :', this.qtde_cestas);
            console.log('serv_auth :', this.serv_auth);

            //função que vai salvar tudo
            //then
            this.message = 'Cadastrado com sucesso!'
            this.colorMessage = 'success'
            this.showMessage = true
            location.reload();
        }
    }
}
</script>

<style>

</style>