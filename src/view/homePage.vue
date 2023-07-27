<template>
  <div >
    <!-- 虽然 router-link 和 router-view 在不同的组件，但是把 navigationSearch 这个公共组件引入后就可以让
    router-link 和 router-view 显示在同一个组件homePage 里面了，这样就可以用嵌套路由了，凡是要在一级路由组件放
    <router-view> 的都要用嵌套路由，动态路由是用来传参的，不能放子路由-->
    <navigationSearch/> 
    <router-view></router-view>

  </div>
</template>

<script>
import navigationSearch from '../components/navigation-seach'

export default {
  components: {
    navigationSearch,//注册为子组件然后再使用
   
  },
   beforeCreate() {
    // console.log('homePage的beforeCreate 钩子');
  },
   created() {
    // console.log('homePage的created 钩子');
    /* let receiveUserId = this.$route.params.userId
        this.$message.success('用户id是：'+receiveUserId); */
  },
  beforeMount() {
    // console.log('homePage的beforeMount 钩子');
    
  },
  mounted() {
    // console.log('homePage的mounted 钩子');
    
  },
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
