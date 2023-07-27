<template>
  <div id="release_goods">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 物品详情输入框 -->
      <el-form-item label="物品详情" prop="goodsDetails">
        <el-input
          type="textarea"
          v-model="ruleForm.goodsDetails"
          :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>
      <!-- 物品类别下拉框  表单项验证时，prop属性来设置要检查的变量，因为输入框等表单的值最终是存在这些变量里 -->
      <el-form-item label="物品类别" prop="goodsType">
        <el-select v-model="ruleForm.goodsType" placeholder="请选择物品类别">
          <el-option label="电子产品" value="shanghai"></el-option>
          <el-option label="书籍教材" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <!-- 物品价格输入框，只能填数字字符串，用正则表达式来限制 -->
      <el-form-item label="物品价格" prop="goodsPrice" class="goods_price_item">
        <el-input
          v-model="ruleForm.goodsPrice"
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
        ></el-input>
      </el-form-item>
      <!-- 联系方式输入框  prop 属性使用来绑定rules 对象里的哪个提示信息显示在哪个表单项下面的，而已-->
      <el-form-item
        label="联系方式"
        prop="contactWays"
        class="goods_price_item"
      >
        <el-input v-model="ruleForm.contactWays"></el-input>
      </el-form-item>
          <!-- accept="image/png,image/gif,image/jpg,image/jpeg" -->
      <!-- 上传图片 -->
      <el-form-item label="物品图片" prop="hasIcon">
        <el-upload
          ref="upload"
          action="#"
          list-type="picture-card"
          :limit="upLoadIMgInfo.limitNum"
          :file-list="fileList"
          :auto-upload="false"

          :on-change="onchange"
          :on-exceed="handleExceed"
          :before-upload="handleBeforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <!-- 上传的图片显示在对话框的img里 -->
        <el-dialog :visible.sync="upLoadIMgInfo.dialogVisible">
          <img width="100%" :src="upLoadIMgInfo.dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 发布按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">发布物品</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "rg",
  data() {
    var valiIcon = (rule, value, callback) => {
      // 图片验证
      if (!this.ruleForm.hasImg) {
        callback(new Error("请上传图片"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        goodsDetails: "",
        goodsType: "",
        goodsPrice: "",
        contactWays: "",
        hasImg: false,
      },
      // goodsImgList 数组 指向fileList 数组，同步记录上传图片的信息，
      // goodsImgList 数组不能写在ruleForm 里，因为那样的话重置按钮点击后，ruleForm里的变量都被清空了，
      // 所以 goodsImgList 数组也变成空数组，不能再指向fileList，导致下一步无法清空goodsImgList 数组
      // 来间接清空fileList 数组让图片消失
      goodsImgList: [],
      goodsImg: {},
      rules: {
        goodsType: [
          //   要求变量不能是空值，否则会显示 message的值
          { required: true, message: "请选择物品类别", trigger: "change" },
        ],
        goodsDetails: [
          { required: true, message: "请填写物品详情", trigger: "blur" },
        ],
        goodsPrice: [
          { required: true, message: "请填写物品价格", trigger: "blur" },
        ],
        //   输入框都是在失去焦点的时候触发验证，所以要 trigger: 'blur'
        contactWays: [
          { required: true, message: "请填写联系方式", trigger: "blur" },
        ],
        // goodsImgList数组记录上传图片的信息，当数组长度是0时，说明用户没有上传图片，发出提示信息
        hasIcon: [{ required: true, validator: valiIcon, trigger: "change" }],
      },

      // 上传图片的相关信息
      upLoadIMgInfo: {
        dialogImageUrl: "",
        dialogVisible: false,
        formLabelWidth: "80px",
        // 限制图片上传的个数
        limitNum: 1,
        form: {},
        fileList: [],
      },
    };
  },
  methods: {
    // 上传按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          //  this 表示当前 vue 实例
          // alert(this.ruleForm.goodsPrice);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 点击图片的删除图片，触发此钩子，file 是被删除的图片
    handleRemove(file, fileList) {
      console.log("移除图片");
      console.log(file, fileList);
      // console.log(file);
    },
    // 重置按钮，
    // 表单的清空，需要给表单绑定一个ref,js中通过$refs我们可以获取到整个表单对象。
    // 然后通过resetFields()方法我们可以清空整个表单
    resetForm(formName) {
      // 清空输入框等表单项
      this.$refs[formName].resetFields();
      // 你要自己将hasImg 变成false
      this.ruleForm.hasImg = false;
      console.log(this.goodsImgList.length);
      // 清空上传的图片
      if (this.goodsImgList.length > 0) {
        // 从数组的第1个元素开始，删除1个元素，所以就删除了第一个元素。因为goodsImgList 数组的个数是 1,
        // 所以就删除了goodsImgList 数组的所有元素，因为goodsImgList 数组指向了fileList 数组，
        // 所以fileList 数组就被清空了（这是最终的目的，fileList 数组清空，上传的图片才消失）
        this.goodsImgList.splice(0, 1);
        console.log("重置后的图片数组的长度：", this.goodsImgList.length);
        // this.handleRemove(this.goodsImg, this.goodsImgList);
      }
    },

// 只有 beforeUpload 的钩子可以访问到 参数 file,继而访问到 file.type
// auto-upload设置为false的时候，before-upload事件是不起作用的；解决办法：使用on-change事件来代替before-upload
    // 上传文件之前的钩子，用来检查文件是否符合上传的规则，文件不仅是图片而已，参数是要上传的文件
  /*   handleBeforeUpload(file) {
       this.$message('上传图片之前');
      // || 只要有一个条件为true时，结果就为true，当两个条件都为false时，结果才为false
      // 当文件的类型都不是png、gif、jpg、jpeg时，()的结果是false，取反后为true，就显示警告信息，
      // 只要是4个文件类型的一种，()的结果就是true，取法是false，也就不会警告了，这是利用少数排除多数的办法
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        )
      ) {
        this.$notify.warning({
          title: "警告",
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
        });
      }

      let size = file.size / 1024 / 1024 / 2;

      if (size > 2) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M",
        });
      }
    }, */


    // 文件超出个数限制时的钩子,
    // 数组 files 是当前你选取文件数，因为一次上传是可以同时选取多张图片的，所以是files
    // 数组 fileList 是你已经上传的文件数量
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.upLoadIMgInfo.limitNum} 文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },

    // 文件列表移除文件时的钩子,只要写，系统自动会显示移除图标
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },

    // 预览文件列表中已上传的文件时的钩子，预览是要启动对话框的，所以上传后显示的图片显示在哪里呢
    handlePictureCardPreview(file) {
      console.log("你预览了");
      this.upLoadIMgInfo.dialogImageUrl = file.url;
      this.upLoadIMgInfo.dialogVisible = true;
    },
    uploadFile() {
      this.$refs.upload.submit();
    },

    // 当点击上传图片后，触发此钩子，因为上传后fileList 的长度增加1，因为多了一个图片，
    // 所以用goodsImgList数组来同步fileList的长度，这样就可以用 goodsImgList去验证用户有没有上传图片了
    onchange(file, fileList) {
      console.log("同步fileList的个数");
      console.log(fileList.length);
      this.goodsImgList = fileList;
      this.goodsImg = file;
      console.log(this.goodsImgList.length);
      // 用 fileList 的长度来判断用户是否上传图片
      if (fileList.length > 0) {
        this.ruleForm.hasImg = true;
      }
      console.log("hasImg：", this.ruleForm.hasImg);

// 文件上传之前的检查
       this.$message('上传图片之前');
      // || 只要有一个条件为true时，结果就为true，当两个条件都为false时，结果才为false
      // 当文件的类型都不是png、gif、jpg、jpeg时，()的结果是false，取反后为true，就显示警告信息，
      // 只要是4个文件类型的一种，()的结果就是true，取法是false，也就不会警告了，这是利用少数排除多数的办法
      console.log("图片类型："+file);
      let imgTyep= file.type === "image/png" ||  file.type === "image/gif" || file.type === "image/jpg" || file.type === "image/jpeg"
      if (!imgTyep) {
        this.$notify.warning({
          title: "警告",
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
        });
      }

      let size = file.size / 1024 / 1024 / 2;

      if (size > 2) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M",
        });
      }
    },
  },
  
};
</script>

<style scoped>
.demo-ruleForm {
  margin-top: 30px;
  margin-right: 30px;
}

/* elementUI 的组件可以用width：百分数设置宽度 */
.goods_price_item {
  width: 50%;
}
</style>
