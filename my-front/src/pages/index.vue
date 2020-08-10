<template>
  <div>
    <!-- {{msg}} -->
    <!-- <componentA></componentA> -->
    <!-- <button @click="back">返回</button> -->
    <router-link :to="{name:'detail'}" active-class="activeBtn">详情页面</router-link>
    <router-link :to="{name:'pl'}" active-class="activeBtn">评论页面</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
// import componentA from '../components/componentA'
export default {
  data() {
    return {
      msg: "1343513"
    };
  },
  created() {
    // console.log(this.$router);
    console.log(this.$route);
  },
  // components:{
  //     componentA
  // }
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.activeBtn{
    background-color: red;
    color:#fff;
}
</style>