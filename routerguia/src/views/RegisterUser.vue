<template lang="">
    <div>
        <input type="text" placeholder="email"><br>
        <input type="password" placeholder="password"><br>
        <button>Send</button>
        <h4>{{params}}</h4>
    </div>
</template>
<script>
export default {
    created() {
       this.params = this.$route.params;
    },
    data() {
        return {
            params: "Nada",
        }
    }
}
</script>
<style lang="">
    
</style>