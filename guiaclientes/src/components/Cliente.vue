<template lang="">
  <div
    id="cliente"
    :class="{
      cliente: !isPremium,
      'cliente-premium': isPremium,
    }"
  >
    <h4>Nome: {{ cliente.nome }}</h4>
    <p>Email: {{ computedEmail }}</p>
    <p v-if="mostrarIdade">idade: {{ cliente.idade }}</p>
    <p v-else>O usuário escondeu a idade!</p>
    <button @click="mudarCor()">Mudar cor!</button>
    <button @click="emitirEventoDelete()">Deletar</button>
  </div>
</template>
<script>
export default {
  props: {
    cliente: {
      nome: String,
      email: String,
      idade: Number,
    },
    mostrarIdade: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["meDelete"],
  data() {
    return {
      isPremium: false,
    };
  },
  computed: {
    computedEmail() {
      return this.cliente.email.toUpperCase();
    }
  }, 
  methods: {
    mudarCor() {
      this.isPremium = !this.isPremium;
    },
    emitirEventoDelete() {
      this.$emit("meDelete");
    },
  },
};
</script>
<style scoped>
#cliente {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 500px;
  margin-top: 12px;
}

.cliente {
  background-color: beige;
}

.cliente-premium {
  background-color: aquamarine;
}
</style>
