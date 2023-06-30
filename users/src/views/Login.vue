<template lang="">
    <div>
        <h2>Login</h2>
        <hr>
        <div class="columns is-mobile is-centered">
            <form class="column is-half">
                <p v-if="error" class="notification is-danger">
                   {{error}} 
                </p>
                <p>E-mail</p>
                <input class="input" type="email" name="email" id="email" v-model.trim="email"><br>
                <p>Senha</p>
                <input class="input" type="password" name="password" id="password" v-model="password"><br>
                <hr>
                <button @click.prevent="login" class="button is-success">Login</button>
            </form>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            email: '',
            password: '',
            error: '',
        }
    },
    methods: {
        login() {
            axios.post("http://localhost:8686/login", {
                email: this.email,
                password: this.password,
            }).then(response => {
                const {access_token} = response.data;
                localStorage.setItem('token', access_token);
                this.$router.push({name: 'home'});
            }).catch(err => {
                const {error} = err.response.data;
                this.error = error;
            })
        }
    }
}
</script>