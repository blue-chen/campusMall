<template>
  <div id="product_List">
<!-- 只用一行一列渲染多个卡片出来 ,el-card设置点击事件，点击事件函数传入item.id ，
路由中加入查询参数，也就是商品的id，然后路由跳转函数携带这个商品id跳转-->
  <el-row style="background:#eeeeee;"  type="flex" justify="center" >
      <el-col :span="15">

        <div class="card_div">
       <el-card :body-style="{ padding: '5px' }" v-for="(item,index) in currentPageGoodsInfo" :key="index" shadow="hover" @click.native="goGoodsDetail(item.goodsId)">
      <img :src='item.goodsImgUrl' id="image">
      <div style="padding: 14px;">
        <span>{{item.goodsDescription}}</span>
        <div class="bottom clearfix">
            <span class="goodsPrice">￥{{item.goodsPrice}}</span>
        </div>
      </div>
    </el-card>
</div>

       <div class="divide_page_div">
    <el-pagination
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    background
    layout="prev, pager, next"
    :total="goodsInfo.length">
  </el-pagination>
    </div>

      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
   data() {
    return {
        goodsType:'电子产品',
        goodsInfo:[],
        currentPage:1, //初始页
        pageSize:8,    //每页的数据个数,只要在:total属性指定要显示的个数，系统会自动算出有多少个分页
        currentPageGoodsInfo: [],// 存储每页要展示的数据
        
    };
  },
   
   created() {
     console.log('电子产品的 created 钩子');
      this.$http.get(this.apis.find_goods_by_type+'?goodsType='+this.goodsType).then(res=>{
      console.log(res)
      if (res.data.code===200){
        console.log("电子产品页面接收数据")
        this.goodsInfo=res.data.data;
           for(let i=0;i<this.goodsInfo.length;i++){
          if( this.goodsInfo[i].goodsDescription.length>10){
          this.goodsInfo[i].goodsDescription=this.goodsInfo[i].goodsDescription.slice(0,10)+'...';
          }
        }

 if(this.goodsInfo.length>8){
    this.currentPageGoodsInfo = this.goodsInfo.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
    }else{
       //少于8个商品直接赋给currentPageGoodsInfo，这是别名而已
      this.currentPageGoodsInfo = this.goodsInfo;
      console.log( this.currentPageGoodsInfo);
    }
      }
    }).catch(error=>{
      console.log("电子产品请求失败");
      console.log(error)
    })
   },

  methods: {
    // 点击商品卡片路由到商品详细信息页
    goGoodsDetail(id){
        this.$router.push({path:"/goodsDetail",query:{goodsId:id}});
    },
       handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log('当前的页数是：',this.currentPage)  //点击第几页
    this.currentPageGoodsInfo = this.goodsInfo.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
              
        },
  }
}
</script>

<style scoped>
  
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
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

 #image {
    width: 100%;
    display: block;
    height: 220px;
  }

  .divide_page_div{
  margin-bottom: 50px;
  text-align: center;
}

.card_div{
  /* 设置卡片容器的高度，避免当卡片数量很少时，分页栏上移，这样不好看 */
  height: 650px;
  /* border: 1px solid #fff; */
}
</style>
