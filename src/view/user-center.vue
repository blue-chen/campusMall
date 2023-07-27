<template>
  <div id="user_center">
    <!-- <navigationSearch/>  -->
    <!-- 电脑布局 -->
  <el-row  type="flex" justify="center" >
  <el-col :span="13" >
      <div>
  <h2 class="user_center_title">个人中心</h2>
  <!-- 用户操作区域 -->
  <div class="user_operation">
      <!-- <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
    <el-radio-button label="top">top</el-radio-button>
    <el-radio-button label="right">right</el-radio-button>
    <el-radio-button label="bottom">bottom</el-radio-button>
    <el-radio-button label="left">left</el-radio-button>
  </el-radio-group> -->
<!-- 这个组件是一个容器，需要你根据需要往里面填各种内容。这个组件也是一个组件，需要你放在一个容器里面 -->
  <el-tabs :tab-position="tabPosition" style="height: 640px;">
    <el-tab-pane label="发布闲置物品" ><releaseGoods/></el-tab-pane>
    <el-tab-pane label="发布招领启事"><lostReport/></el-tab-pane>
    <el-tab-pane label="发布的闲置"><displayReleaseGoodsInfo/></el-tab-pane>
    <el-tab-pane label="修改用户名"><changeUserName/></el-tab-pane>
    <el-tab-pane label="修改密码"><changeUserPwd/></el-tab-pane>
  </el-tabs>
  </div>
   </div>
      </el-col>
</el-row>





<!-- 手机布局 -->
<div class="user-center-phone">

<!-- 按钮点击时，表达式运行，变量drawer的值变成true，抽屉显示 -->
<!-- <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
  点我打开
</el-button> -->

<div class="uc-header">
<button class="button"  @click="drawer = true">
   <!-- <i class="fa fa-bars" /> -->
          <i class="fa fa-bars"></i>
        </button>

        <span>{{menuName}}</span>
</div>
<!-- 抽屉 -->
<el-drawer 
  title="个人中心"
  :visible.sync="drawer"
  :direction="direction">
  <div>
    <el-menu
    router
    :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <!-- 菜单第一行 -->
      <el-menu-item index="/userCenter" @click="closeDrawer('发布闲置物品')">
        <i class="el-icon-upload"></i>
        <span slot="title">发布闲置物品</span>
      </el-menu-item>
      <!-- 菜单第二行 -->
      <el-menu-item index="/userCenter/lostReport"  @click="closeDrawer('发布招领启事')">
        <i class="el-icon-upload"></i>
        <span slot="title">发布招领启事</span>
      </el-menu-item>
      <!-- 菜单第三行 -->
      <el-menu-item index="/userCenter/displayReleaseGoodsInfo" @click="closeDrawer('已发布的闲置')">
        <i class="el-icon-s-order"></i>
        <span slot="title">已发布的闲置</span>
      </el-menu-item>
      <!-- 菜单第四行 -->
      <el-menu-item index="/userCenter/changeUserName" @click="closeDrawer('修改用户名')">
        <i class="el-icon-s-custom"></i>
        <span slot="title">修改用户名</span>
      </el-menu-item>
      <!-- 菜单第五行 -->
       <el-menu-item index="/userCenter/changeUserPwd" @click="closeDrawer('修改密码')">
        <i class="el-icon-edit"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-menu>
  </div>
</el-drawer>

<div class="view-container">
    <router-view></router-view>
 </div>



</div>

  </div>
</template>

<script>
// import navigationSearch from '../components/navigation-seach'
import releaseGoods from './Use-center-inner-component/Release-goods'
import lostReport from './Use-center-inner-component/Lost-property-report'
import displayReleaseGoodsInfo from './Use-center-inner-component/Display-release-goods-info'
import changeUserName from './Use-center-inner-component/Change-user-name'
import changeUserPwd from './Use-center-inner-component/Change-user-pwd'
// import changeUserPwd from './Use-center-inner-component/upload-one-img'



export default {
  
 components: {// 注册子组件
  //  navigationSearch,
   releaseGoods,
   lostReport,
   displayReleaseGoodsInfo,
   changeUserName,
   changeUserPwd,
  },
    data() {
      return {
        tabPosition: 'left',
         drawer: false,
        direction: 'ltr',
        menuName:'发布闲置物品'
      };
    },
     beforeCreate() {
    console.log('user center页面的beforeCreate 钩子');
    
  },
   created() {
    console.log('user center页面的created 钩子');
  },
  beforeMount() {
    console.log('user center页面的beforeMount 钩子');
    
  },
  mounted() {
    console.log('user center页面的mounted 钩子');
    
  },

  methods: {
    closeDrawer(newMenuName) {
      this.menuName=newMenuName;
      this.drawer=false;//点击后让变量drawer变成false，关闭抽屉
        // this.$message('这是一条消息提示');
      },
  },
}
</script>

<style scoped src='../style/user-center.css'>


</style>
