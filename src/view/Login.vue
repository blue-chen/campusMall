<template>
 
<div id="login_part">
    
        <div class="header_title">
          <h1>校园二手交易平台</h1>
        </div>
    
    <!-- 登录部分 -->
    <div class="login_main">
          <!-- 页面内容开始了 -->
          <el-card class="box-card" shadow="always">
            <h1 class="loginTitle">欢迎登陆</h1>
            <el-divider></el-divider>
            <el-form
              :model="numberValidateForm"
              ref="numberValidateForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <!-- 用户名 -->
              <el-form-item
                label="用户名"
                prop="userName"
                :rules="[{ required: true, message: '用户名不能为空' }]"
              >
                <el-input
                  placeholder="请输入用户名"
                  v-model="numberValidateForm.userName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item
                label="密码"
                prop="password"
                :rules="[{ required: true, message: '密码不能为空' }]"
              >
                <!-- 输入框验证：首先设置输入框的prop属性的值是和输入框双向绑定的vue实例变量就行，然后在:rules设置验证规则规则 -->
                <!-- 输入框一输入，键盘就会把数据写到data的变量中，然后变量再传数据到页面的input元素，所以输入框和变量的双向绑定一定要准确 -->
                <el-input
                  placeholder="请输入密码"
                  v-model="numberValidateForm.password"
                  show-password
                ></el-input>
              </el-form-item>

              <el-form-item>
                <!-- 点击提交按钮后， numberValidateForm 变量这个对象作为实参传进提交函数submitForm，这样numberValidateForm的两个属性就会被打包提交-->
                <el-button
                  type="primary"
                  @click="submitForm('numberValidateForm')"
                  >登录</el-button
                >
                <el-button @click="register('numberValidateForm')"
                  >注册</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        
    </div>

    <!-- 页脚部分 -->
    <div class="footer">Copyright 2021 蓝天程 版权所有</div>

    </div>
  
</template>

<script scoped>
// 表单输入一定要有双向数据绑定到data的变量中
export default {
  data() {
    return {
      numberValidateForm: {//存储用户在表单填写的信息
        // 这里变量名字要和后台的负责接收的变量名字一样，不然就报错
        userName: "",
        password: "",
      },
      userId:0,
    };
  },
  methods: {
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
               // 登录
          this.login();
        } else {
          //没有通过表单验证
          console.log("用户名、密码格式错误!!");
          return false;
        }

          // alert('submit!');
          // alert('用户名：'+this.numberValidateForm.name+'\n'+'密码：'+this.numberValidateForm.inputPwd);
          // this.$Message.success(`用户名：${this.numberValidateForm.name}，密码：${this.numberValidateForm.inputPwd}`);

          // this.$axios({
          //             // url: 'localhost:8081/rest/login',
          //             //请求的地址
          //             url: '/rest/login',//请求的地址，这里的 /rest 会重写为 /rest
          //             method: 'post',//请求的方式
          //             data: this.numberValidateForm//请求的表单数据
          //         }).then(res => {
          //           // 获取后台返回的数据
          //             console.info('后台返回的数据', res.data);

          //         }).catch(err => {
          //             console.info('报错的信息', err.response.message);
          //         });

          /*  this.$axios({
            // url: 'localhost:8081/rest/login',
            //向服务器发送请求的 api
            url: "http://47.106.64.140:8007/user/login", //
            method: "post", //请求的方式
            data: this.numberValidateForm, //请求的表单数据
          })
            .then((res) => {
              // 获取后台返回的数据
              // console.info('后台返回的数据', res.data.code);
              this.$message.success("登录成功！");
              this.$router.push("/homePage");
              console.info("后台返回的数据", res.data);
            })
            .catch((err) => {
              console.info("报错的信息", err.response.message);
            }); */

     
      });
    },

    login() {
      /* post 请求函数要两个参数：api 接口、提交的数据，已经是post请求了，所以不用再写请求方式了post或者get */
      this.$http
        .post(this.apis.store_login, this.numberValidateForm)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {//用户名、密码都正确，登录成功
            this.$message({
             message: res.data.msg,
              type: "success",
            });
            sessionStorage.setItem('isLogin', 'true')//设置键值对，isLogin的值是true ,表示用户已经登录
            sessionStorage.setItem("token",res.data.data.token);//将token存到浏览器中
            //获取用户名，用于显示问候语
            sessionStorage.setItem('userName', res.data.data.userInfo.userName);//这里两个userName 可以不同，但为了好对应上，所以写成相同
            sessionStorage.setItem("userId",res.data.data.userInfo.userId);
            this.$router.push("/homePage");//登录成功后跳转到主页

            // name+params 写法1：params 属性里是键值对的形式，还是这个写法简便
            // this.$router.push({name:'homepage',params:{userId:res.data.data.userInfo.userId}});

            // name+params 写法2:params 属性里只有一个变量，需要把数据提前赋给这个变量
            /* let userId=res.data.data.userInfo.userId;
            this.$router.push({name:'homepage',params:{userId}}); */

          } else {// 用户名、密码错误
            this.$message.error(res.data.msg);
          }
        })// cath什么时候启用？
        .catch((error) => {
          this.$message.error("请稍后重试");
        });
    },

     // 注册功能
    register(formName){
      this.$refs[formName].validate((valid) => {
      this.$http
        .post(this.apis.store_register, this.numberValidateForm)
        .then((res) => {
          console.log(res);

          if (res.data.code === 200) {
           
            this.$message({
              message: res.data.msg+'请登录',
              type: "success",
            });
          } else {// 用户名、密码错误
            this.$message.error(res.data.msg);
          }
        })// cath什么时候启用？应该是在请求没有被响应后触发
        .catch((error) => {
          this.$message.error("请稍后重试");
        });

     });   
     }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }

    // 注册
   /*  register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            // url: 'localhost:8081/rest/login',
            //向服务器发送请求的 api
            url: "http://47.106.64.140:8007/user/register", //
            method: "post", //请求的方式
            data: this.numberValidateForm, //请求的表单数据
          })
            .then((res) => {
              // 获取后台返回的数据
              // console.info('后台返回的数据', res.data.code);
              this.$message.success("注册成功！");
              this.$router.push("/login");
              console.info("后台返回的数据", res.data);
            })
            .catch((err) => {
              console.info("报错的信息", err.response.message);
            });
        } else {
          console.log("注册失败!!");
          return false;
        }
      });
    }, */
  }
}
</script>

<style scoped src='../style/login.css'>

</style>