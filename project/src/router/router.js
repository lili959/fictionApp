import VueRouter from 'vue-router'

//导入App的子组件
//全局的引入
import myter from '../../vue/myter.vue'
import login from '../../vue/login.vue'
import register from '../../vue/register.vue'

var router = new VueRouter({
    routes:[
        {path:'/',component:myter,},
        {path:'/myter',component:myter,},
        {path:'/login',component:login,},
        {path:'/register',component:register},
    ]
})

//把路由暴露出去

export default router 