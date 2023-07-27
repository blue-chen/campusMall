<template>
  <div >
    <!-- 这是顶层的router-view，是一级路由的出入口，一级路由的内容将被显示在这里。这里可以不需要放router-link -->
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <!-- 下面是router-view 的简写 -->
    <!-- <router-view/> -->
  </div>
</template>

<script>

export default {
  
}
</script>

<style scoped>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
