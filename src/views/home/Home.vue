<template>
    <div id="Home" class="home">
        <el-container class="heightAll">
            <el-header class="homeHeader">
                <div class="title">易分享</div> 
                <el-dropdown class="userInfo" @command="dropdownEvent">
                <span class="el-dropdown-link">
                    <el-avatar :size="60" src="https://empty" >
                        <img src="http://www.bbrtv.com/uploadfile/image/2018/0307/20180307105825_69298.jpg"/>
                    </el-avatar>
                    <span class="userName">{{user.realname}}</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command = "/user">个人中心</el-dropdown-item>
                    <el-dropdown-item command = "" @click.native="taggleModal">修改密码</el-dropdown-item>
                    <el-dropdown-item command = "">注销登陆</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container class="heightAll">
                <el-aside width="260px" class="heightAll">
                    <el-menu
                    :default-active = "curentPageUrl"
                    class="el-menu-vertical-eshare"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @select="menuClick"
                    >
                     <el-menu-item index="/fileList">
                        <i class="el-icon-files"></i>
                        <span slot="title">文件列表</span>
                    </el-menu-item>

                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-position"></i>
                        <span>文件类型</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item v-for="item in typeList" index="item" :key="item.id">{{item.name}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-menu-item index="/favorite" >
                        <i class="el-icon-star-off"></i>
                        <span slot="title">我的收藏夹</span>
                    </el-menu-item>

                    <el-menu-item index="/myFiles">
                        <i class="el-icon-files"></i>
                        <span slot="title">我的文件</span>
                    </el-menu-item>

                    <el-menu-item index="/upload">
                        <i class="el-icon-upload"></i>
                        <span slot="title">文件共享</span>
                    </el-menu-item>

                    </el-menu>
                </el-aside>

                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
      
       <el-dialog title="修改密码" 
        :visible.sync="showChangePwdModal"
        :append-to-body="true"
        :close-on-click-modal = "false"
         customClass="customWidth"
         width="40%"
        >
            <el-form :model="changePwdForm" :rules="changePwdRules" ref="changePwdForm" v-loading="loading">
                <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPassword">
                    <el-input v-model="changePwdForm.oldPassword" autocomplete="off" show-password class="pwdInput"></el-input>
                </el-form-item>
                
                <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
                    <el-input v-model="changePwdForm.newPassword" autocomplete="off" show-password class="pwdInput"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirnPassword">
                    <el-input v-model="changePwdForm.confirnPassword" autocomplete="off" show-password class="pwdInput"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="changePasswordEvent">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>    

    export default {
        name: "Home",
   
           methods: {
            //菜单处理
            menuClick(url) {
                if (url !== this.curentPageUrl) {
                    this.curentPageUrl = url;
                    this.$router.push(url);
                }
            },
            //下拉菜单处理
            dropdownEvent(command) {
                 if (command !== this.curentPageUrl && command != "") {
                    this.curentPageUrl = command;
                    this.$router.push(command);
                }
            },
            //打开修改密码模态框
            taggleModal() {
                this.showChangePwdModal = !this.showChangePwdModal;
            },
            closeDialog() {
                if (!this.loading) {
                 this.showChangePwdModal = !this.showChangePwdModal;
                }
            },
            //修改密码
            changePasswordEvent() {
                if (this.loading) {
                    return
                }
                this.$refs.changePwdForm.validate((valid) => {
                    if (valid) {
                       this.loading = true
                       this.postRequest('/change_password', this.changePwdForm).then(resp=> {
                           if (resp.code == 200) {
                                this.showChangePwdModal = false;
                                window.sessionStorage.removeItem('token');
                                window.sessionStorage.removeItem('user');
                                this.$alert(resp.message, 'E_SHARE通知', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$router.replace('/login');
                                    }
                                });
                           } 
                           this.loading = false
                       })
                    }
                })
            }
           
        },
        mounted: function(){
            this.$router.replace(this.curentPageUrl);
            this.getRequest('/get_types').then(resp =>{
                if (resp.code == 200) {
                    this.typeList = resp.object;
                    console.log(this.typeList);
                }
            })
        },

        data() {
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
                    if (value !== this.changePwdForm.newPassword) {
                        callback(new Error('两次密码不一致，请重新输入'));
                    }
                    callback();
                }
            };
            
            return{
                curentPageUrl:'/user',
                user: JSON.parse(window.sessionStorage.getItem('user')),
                typeList:[],
                showChangePwdModal: true,
                changePwdForm: {
                    oldPassword: '',
                    newPassword: '',
                    confirnPassword: ''
                },
                loading: false,
                formLabelWidth: '80px',
                changePwdRules: {
                    oldPassword: [{required:true, message:'请输密码', trigger:'blur'}],
                    newPassword: [{required:true, validator: validatePass, trigger:'blur'}],
                    confirnPassword: [{required:true, validator: validateConfirmPass, trigger:'blur'}]
                }
                
            }
        },
        watch: {
            showChangePwdModal: function(newVal) {
                this.$refs['changePwdForm'].resetFields();
            }
        }
    }

</script>

<style scoped>

    .home {
        position: fixed;
        height: 100%;
        width: 100%;
    }

    .homeHeader {
        background: #545c64;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px 0px 30px;
        box-sizing: border-box;
    }

    .title {
        color: white;
        font-size: 25px;
        font-weight: bold;
    }
    
    .el-menu-vertical-eshare:not(.el-menu--collapse) {
        height:100%
    }

    .heightAll {
        height: 100%;
    }
    
    .userInfo {
        cursor: pointer;
        color: white;
        font-size: 18px;
    }

    .el-dropdown-link img {
        widows: 48px;
        height: 48px;
    }

    .userName {
        margin-left: 10px;
        margin-right: 10px;
        font-size: 25px;
        float: right;
        margin-top: 15px;
    }
   
   .customWidth {
       width: 40%;
   }

  .el-form-item >>> .el-input > input{
    height: 50px;
    font-size: 20px;
  }

</style>