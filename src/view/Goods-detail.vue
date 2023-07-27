<template>
  <div id="gooods_detail">
    <!-- 导航栏的 -->
    <navigationSearch/> 
    <!-- 商品内容 -->
     <!-- flex布局让列水平居中 -->
    <!-- <el-row  type="flex" justify="center" >
  <el-col :span="13" > -->
      <div class="container">
  <h2 class="goods_detial_title">商品详情</h2>
  <!-- 卡片组件默认设置了padding -->
 <el-card class="box-card" shadow="always">
     <div class="img_desc_div">
     <!-- 左边的图片区域 -->
 <div class="goodsImg_div"><img :src="goodsInfo.goodsImgUrl" alt=""></div>
 <!-- 右边的商品详情区域 ,这里用了float 方法来让一行并列两个元素，其实更简单的方法就是用两个span就可以，外面套个div就可以了-->
 <div class="goods_desc">
     <span class="span1_3">物品详情：</span>
     <!-- <el-tag type="info" class="span1_3">物品详情</el-tag> -->
     <div class="desc_div">{{goodsInfo.goodsDescription}}</div>

     <span class="span2">售价：</span>
     <div><span class="rmb_sign">￥</span><span class="goods_price">{{goodsInfo.goodsPrice}}</span></div>
     
     <span class="span1_3">联系方式：</span>
     <div>{{goodsInfo.phone}}</div>
 </div>
 </div>
</el-card>
      </div>
      <!-- </el-col>
</el-row> -->
  </div>
</template>

<script>
import navigationSearch from '../components/navigation-seach'

export default {
  components: {
   navigationSearch,
  },
   data() {
       return{
           goodsInfo:{}
       }
   },
    created () {
      // 接收product-list.vue传过来的goodsId，一点击，马上进行路由跳转，路由跳转后到新组件，created() 函数会先创建，然后模板才渲染成html
      let receiveGoodsId = this.$route.query.goodsId
        this.$message.success('物品id是：'+receiveGoodsId);

        this.$http.get(this.apis.find_goods_by_id+'?goodsId='+receiveGoodsId).then(res=>{
      console.log(res);
      if (res.data.code===200){
        console.log("物品详情接收到数据")
        this.goodsInfo=res.data.data;
         
      }
    }).catch(error=>{
      console.log("物品详情请求失败");
      console.log(error)
    })
  },
}
</script>

<style scoped src='../style/goods-detail.css'>

</style>
