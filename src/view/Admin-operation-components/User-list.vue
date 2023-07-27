<template>
  <div>
      <el-table
      :data="tableData"
        stripe
      style="width: 100%;margin-left:30px;">
          <el-table-column
      type="index"
      label="序号"
      width="180">
    </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="180">
      </el-table-column>
     
    </el-table>
  </div>
</template>

  <script>
    export default {
      data() {
        return {
          tableData: [{
            userName: '小天才',
            password: '34242342424',
          
          },
          {
            userName: '小天才',
            password: '34242342424',
          
          },
          {
            userName: '小天才',
            password: '34242342424',
          
          },
          {
            userName: '小天才',
            password: '34242342424',
          
          },
          {
            userName: '小天才',
            password: '34242342424',
          
          },]
        }
      }
    }
  </script>
<style scoped>

</style>
