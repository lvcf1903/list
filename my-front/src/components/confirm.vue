<template>
  <div class="dialogBg">
    <div class="dialog">
      <h1>提示</h1>
      <p>{{title}}</p>
      <ul>
          <li @click="cancel">取消</li>
           <li @click="ok(1)">确定</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    props:['title'],
    methods: {
        cancel(){
            this.$emit('cancel');//自定义事件名称
        },
        ok(num){
            this.$emit('ok',num);
        }
    },
};
</script>
<style lang="">
* {
  margin: 0;
  padding: 0;
}
.dialogBg {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog {
  width: 272px;
  height: 140px;
  background-color: #fff;
}
.dialog h1 {
  height: 22px;
  font-size: 16px;
  font-weight: 700;
  padding-top: 15px;
}
.dialog p{
    padding:10px 20px 15px;
    border-bottom: 1px solid #ddd;
    min-height: 36px;
    position: relative;
}
.dialog ul{
    display: flex;
}
.dialog li{
    list-style: none;
    width: 50%;
    line-height: 41px;
}
</style>