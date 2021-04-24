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
                    <el-dropdown-item>设置</el-dropdown-item>
                    <el-dropdown-item>注销登陆</el-dropdown-item>
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
    </div>
</template>
<script>    
    export default {
        name: "Home",
        methods: {
            menuClick(url) {
                if (url !== this.curentPageUrl) {
                    this.curentPageUrl = url;
                    this.$router.push(url);
                }
            },
            dropdownEvent(command) {
                 if (command !== this.curentPageUrl) {
                    this.curentPageUrl = command;
                    this.$router.push(command);
                }
            }
           
        },
        mounted: function(){
            this.$router.replace(this.curentPageUrl);
            this.getRequest('/get_types').then(resp =>{
                if (resp) {
                    console.log(window.sessionStorage.getItem('user'))
                    this.typeList = resp.object;
                    console.log(this.typeList);
                }
            })


        },
        data() {
            return{
                curentPageUrl:'/fileList',
                user: JSON.parse(window.sessionStorage.getItem('user')),
                typeList:[]
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


</style>
