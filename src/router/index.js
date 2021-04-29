import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login'
import Home from '../views/home/Home'
import Registration from '../views/registration/Registration'
import FileList from '../views/file/FileList'
import MyFiles from '../views/user/MyFiles'
import Upload from '../views/upload/Upload'
import Favorite from '../views/favorite/Favorite'
import File_Type from '../views/file/file_type'
import User from '../views/user/User'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  //内部主页
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      //文件列表
      {
        path: '/fileList',
        name: 'FileList',
        component: FileList
      },
      //我的上传
      {
        path: '/myFiles',
        name: 'MyFiles',
        component: MyFiles
      },
      //我的收藏
      {
        path: '/favorite',
        name: 'Favorite',
        component: Favorite
      },
      {
        path: '/upload',
        name: 'Upload',
        component: Upload
      },
      {
        path: '/file_type',
        name: 'file_type',
        component: File_Type
      },
      {
        path: '/user',
        name: 'User',
        component: User
      }
    ]
  },
  //注册页
  {
    path: '/register',
    name: 'Registration',
    component: Registration
  },
 
]

const router = new VueRouter({
  routes
})

export default router
