<template>
  <div id="app" class="column is-half is-offset-one-quarter">
    <img class="" src="https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo-8.png" alt="">
    <input class="input is-rounded" type="text" placeholder="busca" v-model="busca">
    <button @click="buscar" style="margin: 2%;" class="button">Buscar</button>
    <div v-for="(pokemon, key) in filteredPokemons" :key="pokemon.url">
      <Pokemon :name="pokemon.name" :num="key+1" :url="pokemon.url"></Pokemon>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Pokemon from '@/components/Pokemon.vue';
export default {
  name: 'App',
  components: {
    Pokemon,
  },
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      busca: '',
    }
  },
  created() {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=152&offset=0')
      .then(response => {
        this.pokemons = response.data.results;
        this.filteredPokemons = response.data.results;
      })
  },
  computed: {
    resultadoBusca() {
      if(this.busca == '' || this.buscar == ' ') {
        return this.pokemons;
      } else {
        return this.pokemons.filter(pokemon => pokemon.name == this.busca);
      }
    },
  },
  methods: {
    buscar() {
      this.filteredPokemons = this.pokemons;
      
      if(this.busca == '' || this.buscar == ' ') {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name == this.busca);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
