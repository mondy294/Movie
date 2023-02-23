import axios from "axios";

//引入进度条插件
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css"
import qs from 'qs'

const bupload = axios.create({
    //基础路径 请求时自带路径api
    baseURL: 'http://127.0.0.1:8888',
    timeout: 7000,
    headers: { 'Content-Type': 'multipart/form-data' }
})
bupload.defaults.transformRequest = (data, headers) => {
    const contentType = headers['Content-Type'];
    if (contentType === "application/x-www-form-urlencoded") return qs.stringify(data);
    return data;
};
// const userRequests = axios.create({
//     //基础路径 请求时自带路径api
//     baseURL: 'http://127.0.0.1:3008/my',
//     timeout: 5000
// })

//请求拦截器 在请求发出去之前检测到
bupload.interceptors.request.use((config) => {
    //进度条开始动
    nprogress.start()
    return config
})
//响应拦截器
bupload.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done()
    return res.data
}, (err) => {
    //响应失败
    return Promise.reject(new Error('fail'))

})

export default bupload