<template lang="">
    <div>
        <div class="card">
            <div class="card-image">
              <figure>
                <img :src="currentImg" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{num}} {{upperName}}</p>
                  <p class="subtitle is-6">{{pokemon.type}}</p>
                </div>
              </div>
              <button @click="mudarSprite" class="button">Mudar Sprite</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props: {
        num: Number,
        name: String,
        url: String,
    },
    data() {
        return {
            isFront: true,
            currentImg: '',
            pokemon: {
                type: '',
                front: '',
                back: '',
            }
        }
    },
    created() {
        axios
            .get(this.url)
            .then(response => {
                this.pokemon.type = response.data.types[0]?.type.name;
                this.pokemon.front = response.data.sprites.front_default;
                this.currentImg = this.pokemon.front;
                this.pokemon.back = response.data.sprites.back_default;
            })
    },
    computed: {
        upperName() {
            const newName = this.name[0].toUpperCase() + this.name.slice(1);
            return newName;
        }
    },
    methods: {
        mudarSprite() {
            if(this.isFront) {
                this.isFront = false;
                this.currentImg = this.pokemon.back;
            } else {
                this.isFront = true;
                this.currentImg = this.pokemon.front;

            }
        }
    }
}
</script>
<style lang="">
    
</style>