<template>
    <div>
      {{data}}
      <div ref="dom">获取dom元素</div>
    </div>
</template>
<script>
export default {
  data() {
      return {
          data:'生命周期'
      }
  },
  beforeCreate() {
      console.log('beforecreated'+this.data)
  },
  created() {
     console.log('created'+this.data)
  },
  beforeMount() {
       console.log('beforemout'+this.$refs.dom)
  },
  mounted() {
      console.log('mouted'+this.$refs.dom)
  },
}
</script>
