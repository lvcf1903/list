<template>
    <div>
        <p>计算机属性</p>
        {{getMsg}}
    </div>
</template>
<script >
export default {
    data() {
        return {
            msg:'intewl'
        }
    },
    computed: {
        getMsg(){
            return this.msg.split('').reverse().join('');
        }
    },
    created() {
        var temp=this.msg.split('').reverse().join('');
        console.log(temp);
    },
}
</script>
