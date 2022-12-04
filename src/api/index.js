//引入api接口
import requests from './request'
import userRequests from './userRequests'
import douban from './douban'

//注册用户接口
export const Register = (params) => {
    return requests({
        url: '/reguser',
        method: 'post',
        data: params
    })
}

//登录账户接口
export const Login = (params) => {
    return requests({
        url: '/login',
        method: 'post',
        data: params
    })
}

//访问个人中心接口
export const GetCenterInfo = (params) => {
    return userRequests({
        url: '/center',
        method: 'post',
        data: params
    })
}

//更换头像接口
export const ChangeUserPic = (params) => {
    return userRequests({
        url: '/changepic',
        method: 'post',
        data: params
    })
}

//获取用户数据
export const getUserInfo = (params) => {
    return requests({
        url: '/userinfo',
        method: 'post',
        data: params
    })
}

//请求电影资源的接口
export const getDateInfo = (params) => {
    return douban({
        url: "/j/chart/top_list",
        method: 'get',
        // 这里get请求传参不再是data 而是params
        params: params

    })
}

//搜索电影资源接口
export const getSearchInfo = (params) => {
    return douban({
        url: "search/movie/subject_search",
        method: 'get',
        // 这里get请求传参不再是data 而是params
        params: params

    })
}

// 发送动态接口
export const sendMessageInfo = (params) => {
    return userRequests({
        url: "/sendMessage",
        method: 'post',
        // 这里get请求传参不再是data 而是params
        data: params,

    })
}
// 动态发送图像
export const sendPicInfo = (params) => {
    return userRequests({
        url: "/sendPic",
        method: 'post',
        // 这里get请求传参不再是data 而是params
        data: params,

    })
}

// 获取用户动态信息
export const getMessageInfo = (data) => {
    return userRequests({
        url: `/getMessage`,
        method: 'get',
        // 这里get请求传参不再是data 而是params
        params: data
    })
}