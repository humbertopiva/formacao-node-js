<template lang="">
    <div>
        <h1>Painel Adm!</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Cargo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{getRole(user.role)}}</td>
                    <td>
                        <button class="button is-success">Editar</button>
                        <button class="button is-danger">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        const token = localStorage.getItem("token");
        const req = {
            headers: {
                Authorization: 'Bearer ' +  token
            }
        };

        axios.get("http://localhost:8686/user", req).then(response => {
            const {data} = response;
            this.users = data;
        }).catch(err => {
            console.log(err);
        })
    },
    methods: {
        getRole(role) {
            switch(role) {
                case 0: {
                    return "Usuário Comum"
                }
                case 1: {
                    return 'Admin';
                }
            }
        }
    }
}
</script>
<style lang="">
    
</style>