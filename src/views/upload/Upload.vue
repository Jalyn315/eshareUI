<template>
  <div class="upload">

      <el-form :model="fileForm" ref="fileForm" label-width="100px" class="fileForm">
        <el-form-item>
          <el-upload
            class="upload-demo"
            drag
            action=""
            :file-list="fileForm.fileList"
            :http-request="getFile"
            
            :limit="1"
            >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传不超过2GB的文件</div>
          </el-upload>
        </el-form-item>
        
        <el-form-item label="文件类型" prop="type" placeholder="请选择文件类型">
            <el-select v-model="fileForm.typeId" style="width: 100%" >
               <el-option :label="item.name" v-for="item in typeList" :value="item.id" :key="item.id"></el-option>
            </el-select>          
        </el-form-item>

        <el-form-item label="权限">
            <el-checkbox label="是否可见" v-model="fileForm.is_show" ></el-checkbox>
            <el-checkbox label="运行下载" v-model="fileForm.is_download"></el-checkbox>
        </el-form-item>

        <el-form-item label="文件描述" prop="description" >
            <el-input type="textarea" v-model="fileForm.description" ></el-input>
        </el-form-item>

        <el-form-item>
          <div style="">
              <el-button type="primary" @click="upload">立即上传</el-button>
              <el-button @click="resetForm('fileForm')">重置</el-button>
          </div>
        </el-form-item>

      </el-form>

    

  </div>
</template>

<script>
import axios from "axios";
export default {
    
  mounted: function() {
      this.getRequest('/get_types').then(resp => {
        if(resp) {
            this.typeList = resp.object;
            console.log(this.typeList);
        }
      });

  },
    data() {
      return {
        fileForm: {
            file: null,
            fileList: [],
            typeId: null,
            is_show: true,
            is_download: true,
            description: '',
        },
        typeList:[],
        token: window.sessionStorage.getItem('token')
      }
    },

    methods: {
    
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      getFile(item) {
        console.log(item.file);
        this.fileForm.file = item.file;
      },
      upload() {

          if (this.fileForm.file == null) {
            this.$message.error('请选择需要上传的文件');
            return;
          }
          if (this.fileForm.typeId == null) {
            this.$message.error('请选择文件类型！');
            return
          }
          
        const fd = new FormData();
        fd.append('file', this.fileForm.file);
        fd.append('typeId',1);
        fd.append('is_show', this.fileForm.is_show ? 1 : 0);
        fd.append('is_download',this.fileForm.is_download ? 1 : 0);
        fd.append('description', this.fileForm.description);
        const config = {
          headers: {'Content-Type': 'multipart/form-data', 'Authorization':this.token}
          }
        
        axios.post('/upload', fd, config).then (resp => {
           if(resp) {
             this.$message.success(resp.message);
              console.log(this.fileForm.fileList)
              this.fileForm.fileList = [];
              this.fileForm.file = null;
             this.$refs['fileForm'].resetFields();
             
           }
        })
      }
    }
}
</script>

<style>
  .fileForm {
    width: 500px;
    height: 600px;
    margin:0 auto ;
  }
</style>