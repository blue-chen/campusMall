<template>
  <div id="user_center">
    <!-- <navigationSearch/>  -->
  <el-row  type="flex" justify="center" >
  <el-col :span="15" >
      <div>
  <h2 class="user_center_title">管理员</h2>
  <!-- 用户操作区域 -->
  <div class="user_operation">
    
<!-- 这个组件是一个容器，需要你根据需要往里面填各种内容。这个组件也是一个组件，需要你放在一个容器里面 -->
  <el-tabs :tab-position="tabPosition" style="height: 540px;">
    <el-tab-pane label="用户管理"><userList/></el-tab-pane>
    <el-tab-pane label="商品管理"><goodsList/></el-tab-pane>
  </el-tabs>
  </div>
   </div>
      </el-col>
</el-row>


  </div>
</template>

<script>
import userList from './Admin-operation-components/User-list'
import goodsList from './Admin-operation-components/Goods-list'




export default {
  
 components: {
   userList,
   goodsList,
   
  },
    data() {
      return {
        tabPosition: 'left'
      };
    },
   
}
</script>

<style scoped>
/* 隐藏标题 */
#user_center >>> .goods_type_div{
    display: none;
}

#user_center .user_center_title{
  margin: 5px;
  margin-left: 7px;
  color: rgb(92, 91, 91);
}

#user_center .user_operation{
  background-color: #fff;
  
}

/* 修改label 标签文字的大小 */
/* 这种是在这个组件里面修改那个组件内部某个样式的方式，用>>> */
#user_center >>> .el-tabs__item{
  font-size: 16px;
}
</style>
