<template>
  <div id="app">
    <leftNav></leftNav>


    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import leftNav from '@/components/common/LeftNav'

  export default {
    name: 'app',
    components: {
      "leftNav":leftNav
    }
  }

</script>

<style>
  #app {
    font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  ul,
  li {
    list-style: none;
  }

  .main {
    float: left;
    width: 95%;
    height: 100%;
    background-color: #EFF2F7;
    overflow: auto;
  }

</style>
