<template>
  <div>
    <p class="title">购物车</p>
    <ul class="cartlist">
      <li v-for="(item,index) in cartlist" :key="index">
        <div v-if="item.check">
          <input type="checkbox" checked @click="checkTab(index)" />
        </div>
        <div v-else>
          <input type="checkbox" @click="checkTab(index)" />
        </div>
        <img
          src="https://openfile.meizu.com/group1/M00/07/5F/Cgbj0V1jhtuAa71pAAd3EPLUA9Q862.png@240x240.jpg"
          alt
        />
        <div class="content">
          <p>{{item.title}}</p>
          <p>{{item.attr}}</p>
          <p>{{item.price}}</p>
        </div>
        <div>
          <button @click="del(index)">删除</button>
          <div class="numbox">
            <button @click="minus(index)">-</button>
            <input type="text" :value="item.num" />
            <button @click="add(index)">+</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="total">
      <div v-if="allCheck==cartlist.length">
        <input  type="checkbox" checked @click="allCheckTab" />全选
      </div>
      <div v-else>
        <input  type="checkbox" @click="allCheckTab"  />全选
      </div>
      <div>总数量：{{allNum}} 总价格：{{allPrice}}</div>
      <div>
        <button>立即购买</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allNum: 0,
      allPrice: 0,
      allCheck: 0,
      all_checked:false,
      cartlist: [
        {
          id: 1,
          img:
            "https://openfile.meizu.com/group1/M00/07/5F/Cgbj0V1jhtuAa71pAAd3EPLUA9Q862.png@240x240.jpg",
          title: "魅族 16s Pro",
          attr: "全网通 黑之谧镜 8+128GB",
          price: "2999.00",
          num: 1,
          check: false
        },
        {
          id: 2,
          img:
            "https://openfile.meizu.com/group1/M00/07/5F/Cgbj0V1jhtuAa71pAAd3EPLUA9Q862.png@240x240.jpg",
          title: "魅族 15s Pro",
          attr: "全网通 黑之谧镜 8+98GB",
          price: "2199.00",
          num: 3,
          check: false
        },
        {
          id: 3,
          img:
            "https://openfile.meizu.com/group1/M00/07/5F/Cgbj0V1jhtuAa71pAAd3EPLUA9Q862.png@240x240.jpg",
          title: "魅族 17s Pro",
          attr: "全网通 黑之谧镜 8+98GB",
          price: "3999.00",
          num: 5,
          check: false
        },
        {
          id: 4,
          img:
            "https://openfile.meizu.com/group1/M00/07/5F/Cgbj0V1jhtuAa71pAAd3EPLUA9Q862.png@240x240.jpg",
          title: "魅族 12s Pro",
          attr: "全网通 黑之谧镜 8+98GB",
          price: "2859.00",
          num: 2,
          check: false
        }
      ]
    };
  },
  methods: {
    checkTab(index) {
      //确定勾选的check为true
      this.cartlist[index].check = !this.cartlist[index].check;
      this.getAllNum(); //勾选的时候相应的总数量的值也改变
      this.getAllPrice();
      this.getAllCheck();
    },
    getAllNum() {
      //获取总的数值
      var sum = 0;
      for (var i = 0; i < this.cartlist.length; i++) {
        if (this.cartlist[i].check == true) {
          sum += parseInt(this.cartlist[i].num);
        }
      }
      this.allNum = sum;
    },
    getAllPrice() {
      //获取总价格
      var totalPrice = 0;
      for (var i = 0; i < this.cartlist.length; i++) {
        if (this.cartlist[i].check == true) {
          totalPrice += parseInt(this.cartlist[i].num) * this.cartlist[i].price;
        }
      }
      this.allPrice = totalPrice;
    },
    getAllCheck() {
      //实现全选---数组长度相等
      var num = 0;
      for (var i = 0; i < this.cartlist.length; i++) {
        if (this.cartlist[i].check == true) {
          num++;
        }
      }
      this.allCheck = num;
    },
    allCheckTab(e) {
      // console.log(e);
      //实现全选
      if (e.target.checked == true) {
        for (var i = 0; i < this.cartlist.length; i++) {
          this.cartlist[i].checked = true;
        }
      } else {
        for (var i = 0; i < this.cartlist.length; i++) {
          this.cartlist[i].checked = false;
        }
      }
      

      this.getAllNum();
      this.getAllPrice();
    },
    add(index) {
      //增加数量
      this.cartlist[index].num++;
      this.getAllNum();
      this.getAllPrice();
    },
    minus(index) {
      //减少数量
      if (this.cartlist[index].num == 1) {
        return;
      }
      this.cartlist[index].num--;
      this.getAllNum();
      this.getAllPrice();
    },
    del(index) {
      //删除按钮
      this.cartlist.splice(index, 1);
    }
  }
};
</script>
<style lang="">
* {
  margin: 0;
  padding: 0;
}
.title {
  height: 40px;
  line-height: 40px;
}
.cartlist li {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
.cartlist li img {
  width: 70px;
  height: 70px;
}
.content {
  font-size: 12px;
  text-align: left;
}
.numbox {
  display: flex;
  margin-top: 10px;
}
.numbox input {
  width: 30px;
  text-align: center;
}
.numbox button {
  width: 20px;
}
.total {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  display: flex;
  height: 50px;
  padding: 0 0px;
  align-items: center;
  justify-content: space-between;
}
.total input {
  margin-left: 10px;
}
</style>