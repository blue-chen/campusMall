<template>
  <div>
      <el-table
      :data="tableData"
        stripe
      style="width: 100%;margin-left:30px;">
          <el-table-column
      type="index"
      label="序号"
      width="80">
    </el-table-column>
      <el-table-column prop="title" label="物品详情" width="220"> </el-table-column>
      <!-- 第二列 -->
      <!--加入下面的内容,scope.row代表这一行,img是显示这一行的哪个字段,我的是img,你的自己看下-->
      <el-table-column prop="" label="图片" width="180">
        <template slot-scope="scope">
          <div class="goods_img_div">
          <img :src="scope.row.goodsImg" alt="" >
          </div>
        </template>
      </el-table-column>
      <!-- 第三列 -->
      <el-table-column prop="goodsPrice" label="价格"  width="120"> </el-table-column>
      <el-table-column prop="contactWay" label="联系方式"  width="180"> </el-table-column>
     
    </el-table>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          tableData: [
        {
          title: "95新 iPhone 12",
          goodsImg:
            "https://article-fd.zol-img.com.cn/g6/M00/07/0D/ChMkKV-875GIIxyNAAesdBb5gbwAAFxyQPtBAMAB6yM661.jpg",
          goodsPrice: "6678",
          contactWay:'微信34729847329'
        },
        {
          title: "95 新小米11 ultra 手感很好，拍照很强，颜值很高，陶瓷后盖，屏幕通透，四曲面玻璃",
          goodsImg:
            "https://zhongces3.sina.com.cn/products/202104/bcafa07878c6580e8fc6424b78e17bd7.jpg",
          goodsPrice: "6600",
          contactWay:'电话134729847329'

        },
      ],
        }
      }
    }
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
</style>
