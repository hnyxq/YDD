// 封装axios

import axios from "axios";
import qs from 'querystring';

// 错误信息处理
const errorHandle = (status,other) => {
    switch(status){
        case(400):
            console.log('客户端请求的语法错误');
            break;
        case(401):
            console.log('用户的身份认证失败');
            break;
        case(403):
            console.log('请求被限制');
            break;
        case(404):
            console.log('请求的内容未找到');
            break;
        default:
            console.log('other')
            break;
    }
}

// 创建axios实例
const instance = axios.create({
    // 超时
    timeout: 3000
})

// 跨域 
instance.defaults.baseURL = 'http://localhost:3000';
//token令牌
// instance.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
instance.interceptors.request.use(config => {
    if(config.method === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config;
}, error => Promise.reject(error)
);
// 添加响应拦截器
instance.interceptors.response.use(
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const { response } = error;
        if(response){
            errorHandle(response.status,response.data)
            return Promise.reject(response);
        }else{
            console.log('服务器中断');
        }
        
    }
);

export default instance;
