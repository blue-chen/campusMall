<template>
  <div id="product_List">
      <!-- 这是对el-col 使用v-for，所以会有多个列生成，不是对el-card 使用v-for -->
  <!-- <el-row>
  <el-col :span="8" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row> -->

<!-- 只用一行一列渲染多个卡片出来 ,el-card设置点击事件，点击事件函数传入item.id ，
路由中加入查询参数，也就是商品的id，然后路由跳转函数携带这个商品id跳转-->
<!-- row设置了flex且居中对齐，所以 row中的列居中对齐，但还不能保证商品卡片都居中对齐，还要继续设置 -->
  <!-- <el-row style="background:#eeeeee;"  type="flex" justify="center" >
      <el-col :span="17"> -->
        <!-- 商品卡片区域，每个卡片有商品图片、商品描述、商品价格-->
        <!-- 这里采用弹性布局，.card_div这个弹性元素的宽度只由它的内容的宽度决定，
        这也就是为什么它是div但没有占整行宽度的原因 -->
    <div class="card_div">
       <el-card :body-style="{ padding: '5px' }" v-for="(item,index) in currentPageGoodsInfo" :key="index" shadow="hover" @click.native="goGoodsDetail(item.goodsId)">
      <img :src='item.goodsImgUrl' class="image">
      <div style="padding: 14px;">
        <span>{{item.goodsDescription}}</span>
        <div class="bottom">
            <span class="goodsPrice">￥{{item.goodsPrice}}</span>
        </div>
      </div>
    </el-card>
    </div>
<!-- 分页栏,分页显示的实现原理就是在对应的页数显示对应的一段数组currentPageGoodsInfo，这个数组是从原数组goodsInfo截取出来的，
比如每页显示8个数据，那么第一页应该显示原数组的0-7号元素，0-7号元素存在currentPageGoodsInfo 数组，第二页显示原数组的8-15号元素-->
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

      <!-- </el-col>
    </el-row> -->


  


  </div>
</template>

<script>

export default {
   data() {
    return {
      currentPage:1, //初始页
      pageSize:8,    //每页的数据个数
      currentPageGoodsInfo: [],// 存储每页要展示的数据
      goodsInfo:[],//商品总数
     
        
    };
  },
    beforeCreate() {
    // console.log('product-List的 beforeCreate 钩子');
  },
   created() {
    //  console.log('product-List的 reated 钩子');
      this.$http.get(this.apis.find_all_goods).then(res=>{
      console.log(res)
      if (res.data.code===200){
        this.goodsInfo=res.data.data;//获取响应数据，方便进行处理，这里goodsInfo 数组直接指向了响应中的数组，
        // 所以 goodsImgUrl，goodsDescription，goodsPrice 都要是和响应中的数组中对象的属性一样的名字，这样才能使用到数据。
        // console.log("goodsInfo接收数据")
        // console.log(this.goodsInfo);
        console.log(this.goodsInfo.length);
        //对所有商品的描述截取前十个字符
        for(let i=0;i<this.goodsInfo.length;i++){
          if( this.goodsInfo[i].goodsDescription.length>10){
          this.goodsInfo[i].goodsDescription=this.goodsInfo[i].goodsDescription.slice(0,10)+'...';//只要前十个字符

          }
        }

    // console.log('hhhhhhhh');
    // 判断传过来的商品的个数，如果大于8，就提取goodsInfo的前8个元素给数组 currentPageGoodsInfo，作为当前页的展示商品
    if(this.goodsInfo.length>8){
    this.currentPageGoodsInfo = this.goodsInfo.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
    }else{
      //  console.log('kkkkkk');
       //少于或等于8个商品直接赋给currentPageGoodsInfo，这是别名而已
      this.currentPageGoodsInfo = this.goodsInfo;
      console.log( this.currentPageGoodsInfo);
    }
      }
    }).catch(error=>{
      console.log(error)
    })

   },
    beforeMount() {
    // console.log('product-List 的 beforeMount 钩子');
    
  },
  mounted() {
    // console.log('product-List 的 mounted 钩子');
    
  },
  methods: {
    // 点击商品卡片路由到商品详细信息页，使用query 来传参
    goGoodsDetail(id){
        this.$router.push({path:"/goodsDetail",query:{goodsId:id}});
    },
    // 获得点击的是第几页这个信息。当点击第几页时，这个钩子函数自动运行，参数currentPage 是点击的页数
      handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log('当前的页数是：',this.currentPage)  //点击第几页
    this.currentPageGoodsInfo = this.goodsInfo.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
              
        },
  }
}
</script>

<style scoped src='../style/product-list.css'>
  


</style>
