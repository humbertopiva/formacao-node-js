<template>
  <div>
    <h3>Cadastro: </h3>
    <small id="erro" v-show="deuErro">Dados inválido, tente novamente.</small><br>
    <input type="text" placeholder="nome" v-model="form.nome"><br>
    <input type="email" placeholder="email" v-model="form.email"><br>
    <input type="number" placeholder="idade" v-model="form.idade"><br>
    <button class="button is-primary" @click="cadastrarUsuario">Cadastrar</button>
    <Cliente v-for="(cliente, key) in orderClientes" :key="key" :cliente="cliente" @meDelete="deletarUsuario(cliente.id)"/>
  </div>
</template>

<script>
import _ from 'lodash';
import Cliente from './components/Cliente.vue';

export default {
  name: 'App',
  components: {
    Cliente
  },
  data() {
    return {
      deuErro: false,
      form: {
        nome: '',
        email: '',
        idade: '',
      },
      clientes: [
        {
          id: 1,
          nome: "bHumberto",
          email: "humberto@gmail.com",
          idade: 25,
        },
        {
          id: 2,
          nome: "aDoisberto",
          email: "Doisberto@gmail.com",
          idade: 35,
        },
        {
          id: 3,
          nome: "cTresberto",
          email: "Tresberto@gmail.com",
          idade: 45,
        },
      ]
    }
  },
  computed: {
    orderClientes() {
      return _.orderBy(this.clientes, ['nome'], ['asc']);
    }
  },  
  methods: {
    deletarUsuario(id) {
      this.clientes = this.clientes.filter(el => el.id != id);
    },
    cadastrarUsuario() {
      this.deuErro = false;
      const {nome, email, idade} = this.form;

      if(nome && email && idade) {
        this.clientes.push({
          nome,
          email,
          idade,
        })
      } else {
        this.deuErro = true;
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#erro {
  color: red;
}
</style>
