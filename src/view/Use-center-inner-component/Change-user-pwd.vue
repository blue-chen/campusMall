<template>
  <div>
    <!-- 表单元素可以设置它的margin，来和它的容器保持距离。当容器什么样式都没有设置时，就相当于
  在子元素外面包了一圈细线，细线里面就是父元素的内容 -->
    <el-form  :model="formInline" class="demo-form" label-width="100px">
      <el-form-item label="新的密码：">
        <el-input v-model="formInline.user"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  beforeCreate() {
    console.log('修改密码子组件的beforeCreate 钩子');
    
  },
   created() {
    console.log('修改密码子组件的created 钩子');
  },
  // beforeMount() {
  //   console.log('修改密码页面的beforeMount 钩子');
    
  // },
  // mounted() {
  //   console.log('修改密码页面的mounted 钩子');
    
  // },
  methods: {
    onSubmit() {
      console.log("submit!");
      // this.$message({
      //   message: "恭喜你，这是一条成功消息",
      //   type: "success",
      // });

          this.$message.success('修改成功！');
    },
  },
};
</script>

<style scoped>
.demo-form {
  margin-top: 20px;
  /* margin-left: 20px; */
}
/* 设置输入框的宽度 */
.demo-form .el-input{
  width: 60%;
}
/* 手机模式 */
@media only screen and (max-width: 768px) {
  /* 设置输入框的宽度 */
  .demo-form .el-input{
  width: 90%;
}
}
</style>
