<template>

    <div class="registrationContainer">
        <el-form 
        v-loading="loading"
        element-loading-text="正在注册中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :model="registrationForm" 
        status-icon :rules="rules"
         ref="registrationForm" label-width="100px" class="demo-ruleForm">

             <h3 class="registrationTitle">ESHARE-REGISTRATION</h3>

            <el-form-item label="用户名" prop="username">
               <el-input type="text" v-model=" registrationForm.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password" >
               <el-input type="password" v-model=" registrationForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="confirmPassword">
               <el-input type="password" v-model="registrationForm.confirmPassword" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="真实姓名" prop="realname">
                <el-input type="text" v-model="registrationForm.realname" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
                <el-select v-model="registrationForm.sex" style="width: 100%;">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="生日" prop="birthday" >
                <el-date-picker type="date" placeholder="选择日期" v-model="registrationForm.birthday" style="width: 100%;"></el-date-picker> 
            </el-form-item>
         
            <el-form-item prop="description" label="个人描述">
                <el-input type="textarea" v-model="registrationForm.description" auto-complete="false" resize="none"></el-input>
            </el-form-item>

            <el-form-item prop="code" label="验证码">
                <el-input v-model="registrationForm.code" type="text"  auto-complete="false" placeholder="点击图片更换验证码" class="loginCaptcha"></el-input>
                <img :src="captchaUrl" @click="updateCaptcha">
            </el-form-item>

            <el-form-item>
               <el-button type="primary" @click="register">注册</el-button>
               <el-button @click="resetForm('registrationForm')" >重置</el-button>
           </el-form-item>

        </el-form>
    </div>

</template>

<script>
export default {
    name: 'registrationContainer',
    
    data() {
        //信息校验
        var validatePass = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('请输入密码'));
            } else  {
                if (value.length < 8 || value.length > 16) {
                    callback(new Error('请控制密码长度在8到16位之间'));
                } 
                callback();
            }
        };

        var validateConfirmPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入确认密码'));
            } else {
                if (value !== this.registrationForm.password) {
                    callback(new Error('两次密码不一致，请重新输入'));
                }
                callback();
            }
        };
        return {
            registrationForm: {
                username:'',
                password:'',
                confirmPassword: '',
                birthday:'',
                realname:'',
                sex:'',
                code:'',
                description:''

            },
            loading: false,
            captchaUrl:'/captcha?time='+new Date(),
            rules: {
                username:[
                    {required: true, message:'请输入用户名', trigger: 'blur'},
                    {min: 9, max: 18, message: '请控制长度在9到18个字符之间', trigger:'blur'}
                ],
                password: [{required: true, validator: validatePass, trigger:'blur'}],
                confirmPassword:[{required: true, validator: validateConfirmPass, trigger: 'blur'}],
                realname:[{required: true, message:'请输入真实姓名', trigger:'blur'}],
                code:[{required: true, message:'请输入验证码', trigger:'blur'}],
                
            }
        };
    },
    mounted() {
        
    },
    methods: {
        updateCaptcha() {
            this.captchaUrl ='/captcha?time='+new Date();
            this.registrationForm.code = '';
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        register() {
            this.$refs.registrationForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.postRequest('/register', this.registrationForm).then(resp => {
                        if(resp) {
                            this.$alert(resp.message, 'E_SHARE通知', {
                               confirmButtonText: '确定',
                               callback: action => {
                                   this.$router.replace('/login');
                                }
                            });
                        } else {
                            this.updateCaptcha(); //如果返回的数据为空，说明登陆失败，刷新验证码  
                        }
                        this.loading = false;
                    }) 

                } else {
                    this.$message = '请输入所有字段信息！' ;
                    return false;
                }
            })
        }
        
    },
};
</script>

<style  scoped>

    .registrationContainer{
       border-radius: 15px;
        background-clip: padding-box;
        margin: 80px auto;
        width:400px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6; 
    }   

    .registrationContainer >>> .el-form-item__content {
        display: flex;
        align-items: center;
    }

    .loginCaptcha{
        width: 250px;
        margin-right:  5px;
        font-size: 12px;
    }

    .registrationTitle {
        text-align: center;
        font-size: 25px;
        margin: 0px auto 40px auto;
    }


</style>