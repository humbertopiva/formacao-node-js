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
                <hr>
                <button @click.prevent="edit" class="button is-success">Cadastrar</button>
            </form>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            id: '',
            name: '',
            email: '',
            error: '',
        }
    },
    created() {
        const token = localStorage.getItem("token");

        const req = {
            headers: {
                Authorization: 'Bearer ' +  token
            }
        };
   
        axios.get("http://localhost:8686/user/" + this.$route.params.id, req).then(response => {
            const {id, name, email} = response.data;
            this.id = id;
            this.name = name;
            this.email = email; 
        }).catch(err => {
            this.$router.push({name: 'home'});
            console.log(err);
        })
    },
    methods: {
        edit() {
            const token = localStorage.getItem("token");

            const req = {
                headers: {
                    Authorization: 'Bearer ' +  token
                }
            };

            axios.put("http://localhost:8686/user", {
                id: this.id,
                name: this.name,
                email: this.email,
            }, req).then(response => {
                console.log(response);
                // this.$router.push({name: 'home'});
            }).catch(err => {
                const {error} = err.response.data;
                this.error = error;
            })
        }
    }
}
</script>