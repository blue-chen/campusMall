<template>
  <div id="lost_report">
   <h1>上传图片的精简代码，但和完整代码功能一样</h1>
  <el-upload
       accept="image/png,image/gif,image/jpg,image/jpeg"
        list-type="picture-card"
        :limit=limitNum
        :auto-upload="false"
        :on-exceed="handleExceed"
        :before-upload="handleBeforeUpload"
        :on-preview="handlePictureCardPreview">
        <i class="el-icon-plus"></i>
      </el-upload>
<!-- 上传的图片显示在对话框的img里 -->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

  </div>
</template>

<script>
  
export default {
  data() {
    return{
      dialogImageUrl: '',
      dialogVisible: false,
      formLabelWidth: '80px',
      limitNum: 2,
      form: {},
      fileList:[],
    }
  },
  methods: {
    // 上传文件之前的钩子，用来检查文件是否符合上传的规则，文件不仅是图片而已，参数是要上传的文件
    handleBeforeUpload(file){
      // || 只要有一个条件为true时，结果就为true，当两个条件都为false时，结果才为false
      // 当文件的类型都不是png、gif、jpg、jpeg时，()的结果是false，取反后为true，就显示警告信息，
      // 只要是4个文件类型的一种，()的结果就是true，取法是false，也就不会警告了，这是利用少数排除多数的办法
      if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        });
      }

      let size = file.size / 1024 / 1024 / 2;

      if(size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        });
      }
    },
    // 文件超出个数限制时的钩子,
    // 数组 files 是当前你选取文件数，因为一次上传是可以同时选取多张图片的，所以是files
    // 数组 fileList 是你已经上传的文件数量
    handleExceed(files, fileList) {
     this.$message.warning(`当前限制选择 ${this.limitNum} 文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    // 预览文件列表中已上传的文件时的钩子，预览是要启动对话框的，所以上传后显示的图片显示在哪里呢
    handlePictureCardPreview(file) {
      console.log('你预览了');
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile() {
      this.$refs.upload.submit()
    }
  } 
}

</script>

<style scoped>

  /* .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
  } */

  /* .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }  */

</style>
