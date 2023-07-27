<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%" height="640">
      <!-- 每一列使用width属性来定义列宽 -->
      <!-- 显示日期，通过prop来绑定对象中的data属性来填入日期数据-->
      <!-- 第一列  el-table-column这一列默认是放文字信息的，通过列的prop属性设置文字-->
      <el-table-column prop="goodsDescription" label="标题" width="180"> </el-table-column>
      <!-- 第二列 -->
      <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
      <el-table-column prop="" label="图片" width="180">
        <!-- 通过模板template在列中自定义列的显示内容，插入自己想显示的元素，如img，按钮等 -->
        <template slot-scope="scope">
          <div class="goods_img_div">
          <img :src="scope.row.goodsImgUrl" alt="" >
          </div>
        </template>
      </el-table-column>
      <!-- 第三列 -->
      <el-table-column prop="goodsPrice" label="价格（元）"> </el-table-column>
      <!-- 第四列 -->
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">下架</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 装有对象的数组 tableData
      tableData: [],
    };
  },

  created() {
    console.log("展示用户发布商品子组件的 created");
    this.getUserAllGoods();
   },

    methods: {
      //下架商品。这里的方式是调用删除接口，调用成功后重新发起请求查询用户发布的商品。
      //另一种方法是将返回的data存到本地数组，然后以本地数组作为数据源去渲染页面，当点击“下架”按钮后，本地数组删除某个元素，
      //但这又涉及到数组的挪动操作了
      handleDelete(index, row) {
        // alert(row.goodsId);// row 代表表格一行要放的数组元素，row.goodsId 是指这一行的价格数据
   this.$http.delete(this.apis.user_delete_goods+"?goodsId="+row.goodsId).then(res=>{
      console.log(res)
      if (res.data.code===200){//后端对数据库进行删除操作成功后，返回 200 状态码
     console.log("删除物品成功");
         this.$message({
                  // message: res.data.msg,
                  message:'下架成功！',
                  type: 'success'
                });
    this.getUserAllGoods();//删除一个物品后要重新发送请求，使页面更新

      }
    }).catch(error=>{
      console.log(error)
    })
      },

      //获取用户发布的所有商品信息
      getUserAllGoods(){
 let userId=Number(sessionStorage.getItem("userId"));//从sessionStor 那里获取userId，另一种方式是路由传参来传递userId
     console.log(userId);
      this.$http.get(this.apis.find_user_goods+"?userId="+userId).then(res=>{
      console.log(res)
      if (res.data.code===200){
     console.log("tableData 接收到数据");
        this.tableData=res.data.data;

      }
    }).catch(error=>{
      console.log(error)
    })

      },
    }


};

</script>

<style scoped>
.goods_img_div{
  width: 80px;
  height: 60px;
}

.goods_img_div img{
  width: 100%;
  height: 100%;
}
/* 手机样式 */
@media only screen and (max-width: 768px) {

}
</style>
