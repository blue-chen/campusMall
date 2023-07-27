<template>
  <div id="display_research">
      
   <el-row style="background:#eeeeee;"  type="flex" justify="center" >
      <el-col :span="15">
       <el-card :body-style="{ padding: '5px' }" v-for="(item,index) in goodsInfo" :key="index" shadow="hover" @click.native="goGoodsDetail(item.goodsId)">
      <img :src='item.imgSrc' class="image">
      <div style="padding: 14px;">
        <span>{{item.description}}</span>
        <div class="bottom clearfix">
            <span class="goodsPrice">￥{{item.goodsPrice}}</span>
        </div>
      </div>
    </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
   data() {
       return{
            goodsInfo:[
            {
                imgSrc:'https://article-fd.zol-img.com.cn/g6/M00/07/0D/ChMkKV-875GIIxyNAAesdBb5gbwAAFxyQPtBAMAB6yM661.jpg',
                description:'iphone 12pro max',
                goodsPrice:6000,
                goodsId:123
            },
              {
                imgSrc:'https://article-fd.zol-img.com.cn/g6/M00/07/0D/ChMkKV-875GIIxyNAAesdBb5gbwAAFxyQPtBAMAB6yM661.jpg',
                description:'iphone 12pro max',
                goodsPrice:6000.00,
                goodsId:123

            },
              {
                imgSrc:'https://article-fd.zol-img.com.cn/g6/M00/07/0D/ChMkKV-875GIIxyNAAesdBb5gbwAAFxyQPtBAMAB6yM661.jpg',
                description:'iphone 12pro max',
                goodsPrice:6000.00,
                goodsId:123

            },
              {
                imgSrc:'https://article-fd.zol-img.com.cn/g6/M00/07/0D/ChMkKV-875GIIxyNAAesdBb5gbwAAFxyQPtBAMAB6yM661.jpg',
                description:'iphone 12pro max',
                goodsPrice:6000.00,
                goodsId:123

            },
             
              {
                imgSrc:'https://article-fd.zol-img.com.cn/g6/M00/07/0D/ChMkKV-875GIIxyNAAesdBb5gbwAAFxyQPtBAMAB6yM661.jpg',
                description:'iphone 12pro max',
                goodsPrice:6000.00,
                goodsId:123
            },
            
        ],
       }
   },
   created() {
       let receiveSearchText=this.$route.query.searchText;
        this.$message.success('搜素内容是：'+receiveSearchText);

   },
   watch:{ //下一个点击还是当前路由，路由参数变化但页面不更新解决办法： $route(to, from) {
            '$route': function (to, from) {//监听到路由（参数）改变
                // 拿到目标参数 to.query.searchText 去再次请求数据接口
                let receiveSearchText=to.query.searchText;
                this.$message.success('搜素内容是：'+receiveSearchText);
            }
        },

}
</script>

<style scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  #display_research .image {
    height: 200px;
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

   .el-card{
    width: 225px;
    display: inline-block;
    margin: 0.3em;
    border-radius:5px !important;
  }

.goodsPrice{
    color: rgb(236, 46, 46);
}
</style>
