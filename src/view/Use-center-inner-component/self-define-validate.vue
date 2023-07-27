<template>
  <div >
   <h1>修改密码</h1>

<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  <el-form-item label="密码" prop="pass11">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item label="年龄" prop="age">
    <el-input v-model.number="ruleForm.age"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>

</el-form>

  </div>
</template>

<script>
   export default {
    data() {
        // 这tm是个函数啊，怎么放在data里了，checkAge 是个箭头函数，callback 这回调函数传进来，那我就调用它
      var checkAge = (rule, value, callback) => {
        //   参数value 代表将来要传进来的变量age，value 要是空的字符串，为0的数值类型或者值是false的布尔型，对value进行判断的结果都是false
        if (!value) {
            // 执行return 后就退出这个checkAge 函数了，不会执行下面的 setTimeout。这个应该不是要返回 callback，return 只是要退出这个函数而已
            // 因为下面的callback 也没有 return
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
            // Number.isInteger(value) 的返回值是false ，表示value 不是数值
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);

      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
            // 并且确认密码框也有输入了
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
        //   age 在用户输入后变成数值类型
          age: ''
        },
        rules: {
          pass11: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        //   就是进行表单验证而已
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
