<template lang="">
    <div>
        <h2>Registro de Usuário!</h2>
        <hr>
        <div class="columns is-mobile is-centered">
            <form class="column is-half">
                {{email}}
                <p>Nome</p>
                <input class="input" type="text" name="name" id="name" v-model="name"><br>
                <p>E-mail</p>
                <input class="input" type="email" name="email" id="email" v-model.trim="email"><br>
                <p>Senha</p>
                <input class="input" type="password" name="email" id="email" v-model="password"><br>
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
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>