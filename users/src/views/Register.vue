<template lang="">
    <div>
        <h2>Registro de Usuário!</h2>
        <hr>
        <div class="columns is-mobile is-centered">
            <form class="column is-half">
                <p v-if="error" class="notification is-danger">
                   {{error}} 
                </p>
                <p>Nome</p>
                <input class="input" type="text" name="name" id="name" v-model="name"><br>
                <p>E-mail</p>
                <input class="input" type="email" name="email" id="email" v-model.trim="email"><br>
                <p>Senha</p>
                <input class="input" type="password" name="password" id="password" v-model="password"><br>
                <hr>
                <button @click.prevent="register" class="button is-success">Cadastrar</button>
            </form>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            name: '',
            email: '',
            password: '',
            error: '',
        }
    },
    methods: {
        register() {
            axios.post("http://localhost:8686/user", {
                name: this.name,
                email: this.email,
                password: this.password,
            }).then(response => {
                console.log(response);
                this.$router.push({name: 'home'});
            }).catch(err => {
                const {error} = err.response.data;
                this.error = error;
            })
        }
    }
}
</script>