<template>
  <div>123</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$axios
      .get("http://jsonplaceholder.typicode.com/users")
      .then(function(data) {
          console.log(data);
      });
  }
};
</script>