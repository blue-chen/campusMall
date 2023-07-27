<template>
  <div id="lost_report">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 物品详情输入框 -->
      <el-form-item label="物品详情" prop="lostThing">
        <el-input
          type="textarea"
          v-model="ruleForm.lostThing"
          :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </el-form-item>

      <!-- 联系方式输入框 -->
      <el-form-item
        label="联系方式"
        prop="phone"
        class="contact_item"
      >
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <!-- 上传图片 -->
      <el-form-item label="物品图片" prop="imgUrl">
          <el-upload
               class="upload-demo"
               :action="uploadFileHost"
               :on-remove="handleAvatarRemove"
               :on-success="handleAvatarSuccess"
               :before-upload="handleBeforeUpload"
               :file-list="image_avatar"
               :data="uploadFileData"
           
               list-type="picture"
               :limit="1"
               style="width: 300px">
               <el-button size="small" type="primary">点击上传</el-button>
               <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
             </el-upload>
      </el-form-item>
      <!-- 发布按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">发布物品</el-button>
        <el-button type="info" @click="resetForm('ruleForm')">重置信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "rg",
  data() {
    return {
      ruleForm: {
        lostThing: "",
        phone: "",
        imgUrl:'',//商品图片url，要想传几张图，就要用数组的形式了
        userId:0,
      },
      
       uploadFileHost:'',
      image_avatar:[],
      uploadFileData:{
        'key':'',//文件名
        'OSSAccessKeyId':'',
        'policy':'',
        'signature':'',
        'success_action_status': '200'
      },
      tempImageUrl:'',

      rules: {
       
        lostThing: [
          { required: true, message: "请填写丢失物品详情", trigger: "blur" },
        ],
    
        //   输入框都是在失去焦点的时候触发验证，所以要 trigger: 'blur'
        phone: [
          { required: true, message: "请填写联系方式", trigger: "blur" },
        ],
        // 直接用 goodsImgUrl 是否为空来判断用户是否上传了图片，这个就很高明了
          imgUrl: [
          { required: true, message: "请上传丢失物品图片", trigger: "change" },
        ],
      
      },
    };
  },
  created() {
    console.log("发布招领启事子组件的 created ");
    // 后端的userId 是int型，所以这里要把 sessionStorage 存储的 string 类型的变成number型再赋值给 变量 userId
    this.ruleForm.userId=Number(sessionStorage.getItem("userId"));
  },
  methods: {
    // 发布
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
           console.log("输出丢失物品所有信息");
        console.log(this.ruleForm);
        // http发送表单数据和图片 url
         this.$http.post(this.apis.report_lost,this.ruleForm).then(res=>{
              console.log(res)
              if (res.data.code===200){
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.resetForm('ruleForm');
              }else {
                this.$message.error(res.data.msg);
              }
            }).catch(error=>{
              this.$message.error("系统错误，请稍后重试");
            });

        } else { //表单验证失败
          console.log("error submit!!");
          return false;
        }

      });
    },

    // 重置按钮，
    // 表单的清空，需要给表单绑定一个ref,js中通过$refs我们可以获取到整个表单对象。
    // 然后通过resetFields()方法我们可以清空整个表单
    resetForm(formName) {
      // 清空输入框等表单项
      this.$refs[formName].resetFields();
        this.image_avatar=[];
        this.ruleForm.imgUrl='';
    },

// 只有 beforeUpload 的钩子可以访问到 参数 file,继而访问到 file.type,因为规定了使用 before-upload 限制用户上传的图片格式和大小。
// auto-upload设置为false的时候，before-upload事件是不起作用的；解决办法：使用on-change事件来代替before-upload
    // 上传文件之前的钩子，用来检查文件是否符合上传的规则，文件不仅是图片而已，参数是要上传的文件
    // 点击发布按钮之前，先把图片传到服务器，获取图片的url地址，然后保存在本地，然后将图片url 和其他表单信息一起传到数据库
      handleBeforeUpload(file){
        const imageType = file.type === 'image/jpeg'||file.type==='image/png';
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!imageType) {
          this.$message.error('上传头像图片只能是 JPG,PNG格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 10MB!');
          return false;
        }
        console.log(file)
        console.log("上传文件之前");
        // 将图片上传到服务器，获得图片的在线url
        return new Promise((resolve,reject)=>{
          this.$http.get(this.apis.oss_policy).then(res=>{
            if(res.data.code==200){
                console.log("获取签名成功");
              console.log(res.data.data)
              //获取签名成功
              let suffixName=file.name.substring(file.name.lastIndexOf('.') + 1);//获取上传文件后缀名
              let nowDate = new Date();
              let fileKey=res.data.data.dir+'/'+nowDate.getTime()+'/'+Math.random()*10000+'.'+suffixName//新的文件名
              this.uploadFileHost=res.data.data.host
              this.uploadFileData.key=fileKey
              this.uploadFileData.OSSAccessKeyId=res.data.data.ossAccessKeyId
              this.uploadFileData.policy=res.data.data.policy
              this.uploadFileData.signature=res.data.data.signature
              this.tempImageUrl=res.data.data.host+'/'+fileKey;
              console.log("获取临时图片url了");
              let fd=new FormData()
              fd.append("file",file);
              fd.append("key",fileKey);
              fd.append("OSSAccessKeyId",res.data.data.ossAccessKeyId)
              fd.append("policy",res.data.data.policy)
              fd.append("signature",res.data.data.signature)
                console.log("可以上传了");
              resolve("可以上传")
            }else {
                console.log("获取签名失败");
              reject("系统错误")
            }
          }).catch(error=>{
            console.log("系统错误catch");
            reject("系统错误")
          })
        }
        )

      },

// 移除图片
  handleAvatarRemove(file, fileList) {
        this.image_avatar=[];
        // console.log(file, fileList);
        console.log("avatar 图片移除")
        this.ruleForm.imgUrl='';
      },

  // 图片上传成功钩子
      handleAvatarSuccess(response, file, fileList){
        console.log("二手物品图片上传成功")
        console.log(file);
        this.ruleForm.imgUrl=this.tempImageUrl;// 图片上传成功后将图片url传给表单的变量
       
      },

  },
  
};
</script>

<style scoped>
.demo-ruleForm {
  margin-top: 30px;
  margin-right: 30px;
}

@media only screen and (min-width: 768px) {
  .contact_item>>>.el-input__inner{
    width: 50%;
    border: 1px solid orange;
  }
}
/* elementUI 的组件可以用width：百分数设置宽度 */

</style>
