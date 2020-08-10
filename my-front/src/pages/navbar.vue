<template>
  <div>
    navbar
    <ul class="navbar">
      <li :class="{active:index==0}" @click="tap(0)">选项一</li>
      <li :class="{active:index==1}" @click="tap(1)">选项二</li>
      <li :class="{active:index==2}" @click="tap(2)">选项三</li>
    </ul>
    <ul class="datalist">
      <li v-for="(item,index) in datalist[index]" :key="index">{{item}}</li>
      
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      datalist: [
        ["内容一", "内容二", "内容三", "内容四", "内容五"],
        ["测试一", "测试二", "测试三"],
        ["选项一", "选项二", "选项三"]
      ]
    };
  },
  methods: {
    tap(index) {
      this.index = index;
    }
  }
};
</script>
<style lang="">
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.navbar {
  display: flex;
}
.navbar li {
  width: 33.33%;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
}
.active {
  color: red;
  border-bottom: 2px solid red;
}
.datalist li {
  text-align: left;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
}
</style>