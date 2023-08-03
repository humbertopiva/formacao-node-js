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
                        <router-link :to="{name: 'user-show', params: {id: user.id}}"> 
                            <button class="button is-success">Editar</button>
                        </router-link>
                        <button class="button is-danger" @click="selectUserToDelete(user.id)">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal" :class="{'is-active': showModalDelete}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                      <p class="card-header-title">
                        Deletar usuário
                      </p>
                      <button class="card-header-icon" aria-label="more options">
                        <span class="icon">
                          <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                      </button>
                    </header>
                    <div class="card-content">
                      <div class="content">
                        Você deseja deletar o usuário?
                      </div>
                    </div>
                    <footer class="card-footer">
                      <a href="#" class="card-footer-item" @click="hideDeleteModal">Cancelar</a>
                      <a href="#" class="card-footer-item" @click="confirmDeleteUser">Confirmar</a>
                    </footer>
                  </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="hideDeleteModal"></button>
          </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            users: [],
            showModalDelete: false,
            deleteUserId: null,
        }
    },
    created() {
        this.refreshUsers();
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
        },
        showDeleteModal() {
            this.showModalDelete = true;
        },
        hideDeleteModal() {
            this.showModalDelete = false;
        },
        refreshUsers() {
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
        selectUserToDelete(id) {
            this.deleteUserId = id;
            this.showDeleteModal();
        },
        confirmDeleteUser() {
            const token = localStorage.getItem("token");
            const req = {
                headers: {
                    Authorization: 'Bearer ' +  token
                }
            };

            axios.delete("http://localhost:8686/user/" + this.deleteUserId, req).then(response => {
                console.log(response);
                this.showModalDelete = false;
                this.refreshUsers();
            }).catch(err => {
                console.log(err);
                this.showModalDelete = false;
            })
        },
    }
}
</script>
<style lang="">
    
</style>