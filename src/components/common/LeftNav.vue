<template>
  <div class="left-nav">
    <ul>
      <li>
        <i class="iconfont icon-jiage"></i>
        <div>收银</div>
      </li>
      <li>
        <i class="iconfont icon-hanbao"></i>
        <div>商品</div>
      </li>
      <li>
        <i class="iconfont icon-31dianpu"></i>
        <div>店铺</div>
      </li>
      <li>
        <i class="iconfont icon-huiyuanqia"></i>
        <div>会员</div>
      </li>
      <li>
        <i class="iconfont icon-gongnengjianyi"></i>
        <div>统计</div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'leftNav',
    data() {
      return {

      }
    }
  }

</script>
<style>
  .left-nav {
    width: 5%;
    height: 100%;
    font-size: 10px;
    color: #fff;
    background-color: #1D8ce0;
    float: left;
  }

  .iconfont {
    font-size: 24px;
  }

  .left-nav ul {
    padding: 0;
    margin: 0;
  }

  .left-nav li {
    padding: 20px 0;
    text-align: center;
  }

</style>
