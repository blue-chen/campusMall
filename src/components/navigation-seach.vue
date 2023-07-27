<template>
  <div id="search_item">
     

<div>
  <div>
    <h1 class="title">校园二手</h1>
  </div>
  <div class="input-button-container1">
<div class="input-button-container2">
      <!-- 搜素框 -->
    <el-input class="search_input" v-model="searchInput" placeholder="搜点什么吧" ></el-input>
<!-- 按钮 -->
    <el-button class='search_btn' type="primary" @click="starSearch(searchInput)">搜索</el-button>
</div>
     <div class="hot_key">
            <a href="#" @click='changeItem("数码电子")'>数码电子</a>
            <a href="#" @click='changeItem("服饰美容")'>服饰美容</a>
            <a href="#" @click='changeItem("体育器械")'>体育器械</a>
            <a href="#" @click='changeItem("休闲食品")'>休闲食品</a>
        </div>
  </div>

</div>

<!-- 导航栏 -->
<el-row class="navigation_row" id="navigation-bg" >
  <el-col :span="12" :offset='2'>
    <ul id="navigation_Ul">
    <li><router-link to="/homePage" @click.native='changeGoodsType("所有商品")'>所有商品</router-link></li><span>|</span>
      <li><router-link to="/homePage/electronicProducts" @click.native='changeGoodsType("电子产品")'>电子产品</router-link></li><span>|</span>
       <li><router-link to="/homePage/books" @click.native='changeGoodsType("书籍教材")'>书籍教材</router-link></li><span>|</span>
       <li><router-link to="/homePage/sportGoods" @click.native='changeGoodsType("体育用品")'>体育用品</router-link></li><span>|</span>
          <li><router-link to="/homePage/lostThingsDisplay" @click.native='changeGoodsType("招领启事")'>招领启事</router-link></li>
    </ul>
    </el-col>
  <el-col :span="10">
   <div class="login_part">
    <span>{{showUserName+' '}}您好，欢迎光临！</span> 
      <!-- <router-link to="/login">请登录</router-link> <router-link to="/adminOperation">免费注册</router-link>  -->
      <router-link to="/userCenter">个人中心</router-link>
      <router-link to="" class="log_out" @click.native='logout'>退出登录</router-link>
</div>
  </el-col>
</el-row>

<!-- 手机模式的导航栏 -->
<div class="link-container">
<div class="link-for-phone">
<el-dropdown @command="handleCommand" trigger="click">
  <span class="el-dropdown-link">
    商品类型<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="/homePage" @click.native='changeGoodsType("所有商品")'>所有商品</el-dropdown-item>
    <el-dropdown-item command="/homePage/electronicProducts" @click.native='changeGoodsType("电子产品")'>电子产品</el-dropdown-item>
    <el-dropdown-item command="/homePage/books" @click.native='changeGoodsType("书籍教材")'>书籍教材</el-dropdown-item>
    <el-dropdown-item command="/homePage/sportGoods" @click.native='changeGoodsType("体育用品")'>体育用品</el-dropdown-item>
    <el-dropdown-item command="/homePage/lostThingsDisplay" @click.native='changeGoodsType("招领启事")'>招领启事</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>


<router-link  class="person-center" to="/userCenter">个人中心</router-link>


 <router-link to="" @click.native='logout'>退出登录</router-link>
 
</div>
</div>

<div class="goods_type_div"><h2 class="goods_type" id="name">{{goodsType}}</h2></div>

  </div>
</template>

<script>
export default {
    data() {
    return {
      searchInput: '',
       goodsType:'所有商品',
       showUserName:'',
    }
  },
   beforeCreate() {
    // console.log('导航栏的 beforeCreate 钩子');
    
  },
   created() {
    // console.log('导航栏的 created 钩子');
    this.showUserName=sessionStorage.getItem("userName");// 获取用户名
  },
  beforeMount() {
    // console.log('导航栏的 beforeMount 钩子');
    
  },
  mounted() {
    // console.log('导航栏的 mounted 钩子');
    
  },
  methods:{
      changeItem: function(searchInput) {
            this.searchInput = searchInput;
            // this.searchWeather();
        },
      changeGoodsType:function(inputType){
        // console.log('点击招领启事了');
        this.goodsType=inputType;
        console.log('点击类型是',this.goodsType);
      },
      starSearch:function(searchInputText){
            this.goodsType = '搜索结果';
           console.log('开始搜索');
        // this.$router.push('/homePage/displaySearchResult');
        this.$router.push({path:"/homePage/displaySearchResult",query:{searchText:searchInputText}});

      },
      logout(){
           sessionStorage.clear();//清除token
      this.$router.push('/login');
      },
// 下拉菜单点击事件，点击菜单项后会触发事件
      handleCommand(command) {
        this.$router.push(command);
      }
  }

}
</script>

<style scoped src='../style/navigation.css'>

</style>
