<template>
  <div class="container">
    <el-avatar class="avatar" :size="120" src="https://empty" >
      <img src="http://www.bbrtv.com/uploadfile/image/2018/0307/20180307105825_69298.jpg"/>
    </el-avatar>
    <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="realname">
      <el-input v-model="ruleForm.realname"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="ruleForm.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="生日">
        <el-form-item prop="birthday">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
        </el-form-item>
    </el-form-item>
  
    <el-form-item label="个人说明" prop="description">
      <el-input type="textarea" v-model="ruleForm.description"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button :type="buttonType" @click="submitForm('ruleForm')" class="saveButton">保存</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          id:'',
          user_id: '',
          realname: '',
          sex: '',
          birthday:'',
          description: ''
        },
       buttonType: 'info',
       initStage: true
      };
    },

    watch: {
     'ruleForm.realname': function () {
        this.buttonType = JSON.stringify(this.ruleForm) != window.sessionStorage.getItem('user') && !this.sinitStage? 'primary' : 'info';
      },
      'ruleForm.sex': function () {
        this.buttonType = JSON.stringify(this.ruleForm) != window.sessionStorage.getItem('user') && !this.sinitStage? 'primary' : 'info';
      },
      'ruleForm.birthday': function () {
        this.buttonType = JSON.stringify(this.ruleForm) != window.sessionStorage.getItem('user') && !this.sinitStage? 'primary' : 'info';
      },
      'ruleForm.description': function () {
        this.buttonType = JSON.stringify(this.ruleForm) != window.sessionStorage.getItem('user') && !this.sinitStage? 'primary' : 'info';
      }
      


    },
    mounted: async function() {
      var userInfo  = JSON.parse(window.sessionStorage.getItem('user'))
      console.log(window.sessionStorage.getItem('user'))
      if (userInfo) {
          await this.getRequest('/user_info').then(resp =>{
            if (resp) {
              userInfo = resp.object;
              window.sessionStorage.setItem('user', JSON.stringify(userInfo));
            }
        })
      this.ruleForm.id = userInfo.id
      this.ruleForm.realname = userInfo.realname;
      this.ruleForm.sex = userInfo.sex;
      this.ruleForm.birthday = userInfo.birthday;
      this.ruleForm.description = userInfo.description;
      this.ruleForm.user_id = userInfo.user_id
      this.buttonType = 'info';
      this.initStage = false
      
      }
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid && this.buttonType != 'info') {
              this.postRequest('/update_user_info',  this.ruleForm).then (resp => {
                window.sessionStorage.setItem('user', JSON.stringify(resp.object));  //更细本地内存用户信息
                this.$message.success("更新成功!")
                this.buttonType = 'info';
              })
           
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
    .container {
      width: 400px;
      margin: 0 auto;
      margin-top: 45px;
    }
    .avatar {
      display: block;
      margin:20px auto;
    }
    .saveButton {
      width: 100%;
    }
</style>