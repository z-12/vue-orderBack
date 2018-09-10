<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" id="posOrder" class="pos-order">
        <el-tabs class="tab-container">
          <el-tab-pane label="点餐">
            <!-- 表格 -->
            <el-table :data="tableData" class="table-container">
              <el-table-column prop="goodsName" label="商品" width="150">
              </el-table-column>
              <el-table-column prop="number" label="数量" width="100">
              </el-table-column>
              <el-table-column prop="price" label="价格" width="100">
              </el-table-column>
              <el-table-column prop="address" label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="addOrderList(scope.row)">添加</el-button>
                  <el-button size="mini" type="text" @click="deleteGoods(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="total-container">
              <span>总量: {{totalCount}}</span>
              <span>总价: {{totalPrice}}元</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">
          </el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
        <div class="btn-container">
          <el-button type="success" @click="checkOut">结账</el-button>
          <el-button type="primary">挂单</el-button>
          <el-button type="danger" @click="deleteAll">删除</el-button>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="often-goods">
          <div class="often-title">常用商品</div>
          <div class="often-list">
            <ul>
              <li v-for="goods in oftenGoods" :key="goods.goodsId" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">￥{{goods.price}}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 食品分类 -->
        <div class="goods-type">
          <el-tabs class="tab-container">
            <el-tab-pane label="汉堡">
              <ul class="cook-list">
                <li v-for="item in type0Goods" :key="item.goodsId" @click="addOrderList(item)">
                  <span class="food-img"><img :src="item.goodsImg" alt=""></span>
                  <div class="goods-info">
                    <span class="food-name">{{item.goodsName}}</span>
                    <span class="food-price">￥{{item.price}}</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <ul class="cook-list">
                <li v-for="item in type1Goods" :key="item.goodsId" @click="addOrderList(item)">
                  <span class="food-img"><img :src="item.goodsImg" alt=""></span>
                  <div class="goods-info">
                    <span class="food-name">{{item.goodsName}}</span>
                    <span class="food-price">￥{{item.price}}</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮品">
              <ul class="cook-list">
                <li v-for="item in type2Goods" :key="item.goodsId" @click="addOrderList(item)">
                  <span class="food-img"><img :src="item.goodsImg" alt=""></span>
                  <div class="goods-info">
                    <span class="food-name">{{item.goodsName}}</span>
                    <span class="food-price">￥{{item.price}}</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <ul class="cook-list">
                <li v-for="item in type3Goods" :key="item.goodsId" @click="addOrderList(item)">
                  <span class="food-img"><img :src="item.goodsImg" alt=""></span>
                  <div class="goods-info">
                    <span class="food-name">{{item.goodsName}}</span>
                    <span class="food-price">￥{{item.price}}</span>
                  </div>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "pos",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalCount: 0,
      totalPrice: 0
    };
  },
  methods: {
    addOrderList: function(goods) {
      // 商品是否存在列表中
      let isHave = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId == goods.goodsId) {
          isHave = true;
        }
      }

      if (isHave == true) {
        let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
        arr[0].number++;
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          number: 1
        };
        this.tableData.push(newGoods);
      }
      this.getMoney();
    },
    // 删除单个商品
    deleteGoods: function(goods) {
      this.tableData = this.tableData.filter(o => o.goodsId != goods.goodsId);
      this.getMoney();
    },
    // 计算总数量和总价
    getMoney: function() {
      this.totalCount = 0;
      this.totalPrice = 0;
      this.tableData.forEach(element => {
        this.totalCount += element.number;
        this.totalPrice = this.totalPrice + element.price * element.number;
      });
    },
    // 删除全部订单
    deleteAll: function() {
      this.tableData = [];
      this.totalCount = 0;
      this.totalPrice = 0;
    },
    // 结账
    checkOut: function() {
      if (this.totalCount != 0) {
        this.tableData = [];
        this.totalCount = 0;
        this.totalPrice = 0;
        this.$message({
          message: "结算成功",
          type: "success"
        });
      } else {
        this.$message.error("没有任何商品");
      }
    }
  },
  mounted: function() {
    // 设置高度
    let orderHeight = document.body.clientHeight;
    document.getElementById("posOrder").style.height = orderHeight + "px";
  },
  created: function() {
    // ajax请求数据
    axios
      .get(
        "https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods"
      )
      .then(response => {
        // console.log(response);
        this.oftenGoods = response.data;
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(
        "https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods"
      )
      .then(response => {
        // console.log(response);
        this.type0Goods = response.data[0];
        this.type1Goods = response.data[1];
        this.type2Goods = response.data[2];
        this.type3Goods = response.data[3];
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
  height: 100%;
}

.tab-container {
  padding: 10px;
}
.table-container {
  width: 100%;
}

.btn-container {
  text-align: center;
  padding-top: 50px;
}

.often-title {
  height: 20px;
  padding: 14px;
  background-color: #f9fafc;
}

.often-list ul li {
  float: left;
  background-color: #fff;
  border: 1px solid #c0ccda;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
.o-price {
  color: #58b7ff;
}
.goods-type {
  clear: both;
}
.cook-list li {
  width: 20%;
  height: auto;
  background-color: #fff;
  float: left;
  overflow: hidden;
  border: 1px solid #e5e9f2;
  padding: 8px;
  margin: 5px;
  cursor: pointer;
}
.cook-list li span {
  display: block;
}
.food-img {
  width: 40%;
  float: left;
}
.food-img img {
  width: 100%;
  height: 80px;
}
.food-name {
  font-size: 18px;
}
.food-price {
  font-size: 16px;
  color: #58b7ff;
  padding-top: 5px;
}
.goods-info {
  text-align: center;
  padding-top: 15px;
}
.total-container {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #e5e9f2;
}
.total-container span {
  padding: 0 10px;
}
</style>
