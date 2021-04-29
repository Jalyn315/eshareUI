import axios from "axios";
import {Message} from 'element-ui';
import router from "../src/router";

/**
 * 请求拦截器，用户在登陆成果时会获取到token，并将token存放到windo.sessionStorage中，在下一笔发送请求时，
 * 首先会被该拦截器进行拦截，并判断当前的sessionStorage中是否存在token，如果存在则将token插入到请求头的
 * Authorization槽中。然后放行请求。
 */
axios.interceptors.request.use(config => {
    //如果存在token，将token放到请求头中
    if(window.sessionStorage.getItem('token')) {
        config.headers['Authorization'] = window.sessionStorage.getItem('token'); //插入token
    }
    return config;
}, error => {
    console.log(error);
});


/**
 * 该文件用于处理错误处理
 * 后期需要对该页面进行扩展，对后端返回的不同错误码进行相对应的处理
 */
//响应拦截器
axios.interceptors.response.use(success => { //成功调到后端接口
    //业务逻辑错误
    if(success.status && success.status == 200) { //http状态码存在且等于200
        if(success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {  //服务器异常
            Message.error({message: success.data.message});
            return;
        } else  { 
            if (success.data.code != 200) {
                Message.error({message: success.data.message});
            }
            return  success.data;
        }
    }   //返回数据
}, error => { //没有调到后端接口
    if (error.response.code == 504 || error.data.code == 404) {
        Message.error({message:'服务器被吃了!!!'});
    } else if (error.response.code == 403) {
        Message.error({message:'权限不足，请联系管理员！'});
    } else if (error.response.code == 401) {
        Message.error({message:'尚未登陆请登陆'});
        router.replace('/');
    } else {
        if (error.response.data.message) {
            Message.error({message:error.response.data.message})
        } else {
            Message.error({message:'未知错误！'})
        }
    }
});


//封装请求

let base = '';

/**
 * 传送json格式的post请求
 * @param url
 * @param params
 * @returns {AxiosPromise}
 */
export const postRequest = (url,params)=>{
    return axios({
        method: 'post',
        url:`${base}${url}`,
        data:params
    })
}

/**
 * 封装put请求
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
export const putRequest = (url, params, config) => {
    return axios({
        method: 'put',
        url:`${base}${url}`,
        data: params
    })
}

/**
 * 封装delete请求
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
 export const deleteRequest = (url, params) => {
     return axios({
         method:'delete',
         url:`${base}${url}`,
         data: params
     })
 }

 /**
  * 封装get请求
  * @param {*} url 
  * @param {*} params 
  * @returns 
  */
 export const getRequest = (url, params) => {
     return axios({
         method: 'get',
         url:`${base}${url}`,
         data: params
     })
 }

 export const getDownload = (url, params) => {
    return axios({
        method: 'get',
        url:`${base}${url}`,
        data: params,
        responseType: 'blob'
    })
}



