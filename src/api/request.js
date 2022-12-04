import axios from "axios";

//引入进度条插件
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css"

const requests = axios.create({
    //基础路径 请求时自带路径api
    baseURL: 'http://127.0.0.1:3008/api',
    timeout: 5000
})
// const userRequests = axios.create({
//     //基础路径 请求时自带路径api
//     baseURL: 'http://127.0.0.1:3008/my',
//     timeout: 5000
// })

//请求拦截器 在请求发出去之前检测到
requests.interceptors.request.use((config) => {
    //进度条开始动
    nprogress.start()
    return config
})
//响应拦截器
requests.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done()
    return res.data
}, (err) => {
    //响应失败
    return Promise.reject(new Error('fail'))

})

export default requests