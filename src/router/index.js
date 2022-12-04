import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//引入路由组件
import routes from './routes'



const router = new VueRouter({
    routes: routes

})
export default router
