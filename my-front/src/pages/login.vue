<template>
    <div>
        <router-link to="./index">点击</router-link>
        <button @click="location">编程式跳转</button>
    </div>
</template>
<script>
export default {
    methods: {
        location(){
            // this.$router.push('/index')
            this.$router.push({name:'index'})
        }
    },
}
</script>