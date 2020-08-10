<template>
  <div>
    <p>tosolist实例</p>
    <div>
      <input type="text" v-model="task" />
      <button @click="add">添加</button>
      <button @click="editBtn(currindex)">编辑</button>
      <p>任务列表</p>
      <ul>
          <li v-for="(item,index) in tasklist" :key="index">
              {{item}}
            <button @click="edit(index)">编辑</button>
            <button>删除</button>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        task:'',
        tasklist:[],
        currindex:''
    }
  },
  methods: {
      add(){
          this.tasklist.push(this.task)
          this.task=''
      },
      edit(index){
         this.task=this.tasklist[index];
         this.currindex=index
      },
      editBtn(){
          this.tasklist.splice(currindex,1,this.task);
      }
  },
}
</script>