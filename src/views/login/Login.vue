<template>
    <div class="loginContainer">
        <el-form :rules="loginRules" 
                v-loading="loading"
                element-loading-text="正在登陆中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                ref="loginForm" 
                :model="loginForm">
            <h3 class="loginTitle">ESHARE-LOGIN</h3>
            <el-form-item prop="username">
                <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="UserName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="Password"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" type="text" auto-complete="false" placeholder="点击图片更换验证码" class="loginCaptcha"></el-input>
                <img :src="captchaUrl" @click="updateCaptcha">
            </el-form-item>
            <el-checkbox v-model="loginForm.checked" class="loginRemember" >记住我?</el-checkbox>
            <el-button type="primary" style="width: 100%" @click="loginSubmit">登陆</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return{
                //表单数据
                captchaUrl:'/captcha?time='+new Date(),
                loginForm:{
                    username:"feibo",
                    password:"12345678",
                    checked:true,
                    code:''
                },
                loading: false,   // 控制loading
                //校验规则
                loginRules: {
                    username:[{required:true, message:'请输入用户名', trigger:'blur'}],
                    password:[{required:true, message:'请输入密码', trigger:'blur'}],
                    code:[{required:true, message:'请输入验证码', trigger:'blur'}]
                }
            }
        },
        methods:{
            /*更新验证码*/
            updateCaptcha() {
                this.captchaUrl = '/captcha?time=' + new Date();
                this.loginForm.code = '';
            },


            loginSubmit(){
                //通过ref对应的名称找到对应的表单，首先判断表单是否校验通过
                this.$refs.loginForm.validate((valid) => {
                    if(valid) {
                        this.loading  = true;
                        this.postRequest('/login', this.loginForm).then(resp => {
                            console.log(resp.code)
                           if( resp.code == 200) {
                               console.log(resp.data)
                               const tokenStr = resp.object.tokenHead + resp.object.token;   //拿到token
                               console.log(tokenStr)
                              window.sessionStorage.setItem('token', tokenStr); //存储token
                               this.$router.replace('/home');        
                           } else {
                               this.updateCaptcha(); //如果返回的数据为空，说明登陆失败，刷新验证码 
                            }
                            this.loading = false;
                        })
                    } else {
                        this.$message.error('请输入所有字段信息！')
                        return false;
                    }
                });
            }
        }

    }
</script>

<style scoped>

    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width:350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle{
        margin: 0px auto 40px auto;
        text-align: center;
        font-size: 25px;
    }

    .loginCaptcha{
        width: 250px;
        margin-right:  5px;
        font-size: 12px;
    }

    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }

  .loginContainer >>> .el-form-item__content {
    display: flex;
    align-items: center;
}


</style>