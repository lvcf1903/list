<template>
  <div>
      <p>过滤器应用</p>
      <!-- {{num|toFixed(3,'$')}} -->
      {{time|timeFormat}}
  </div>
</template>
<script>
export default {
  data() {
    return {
        // num:2
        time:1424624624
    }
  },
  filters: {
      //第一个参数对应变量的内容
    //   toFixed(val,arg,arg2){
    //         return arg2+val.toFixed(arg);
    //   }
    //时间戳
    timeFormat(val){
      //  console.log(val);
      var time=new Date(val*1000);
      console.log(time);
    }
  }
}
</script>