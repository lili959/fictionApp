import VueRouter from "vue-router"
// 书架
import home from "./vue/home.vue"
import catalogue from "./vue/catalogue.vue"
import read from "./vue/read.vue"

// 个人中心
import myter from "./vue/myter.vue"
// 登录
import login from "./vue/login.vue"
// 注册
import register from "./vue/register.vue"

// 书城付费
import pay from "./vue/pay.vue"
// 分类
import classlist from "./vue/classlist.vue"


// 书城免费
import free from "./vue/free.vue"
import recommended from "./vue/recommended.vue"
import boy from "./vue/boy.vue"
import girl from "./vue/girl.vue"
import classify from "./vue/classify.vue"
import male from "./vue/male.vue"
import female from "./vue/female.vue"
import publish from "./vue/publish.vue"
import details from "./vue/details.vue"
import search from "./vue/search.vue"

var router = new VueRouter({
    routes: [
        { path: '/home', name:"home",component: home , children:[
            {path:'/catalogue',name:"catalogue",component: catalogue},
            {path:'/read',name:'read',component:read}
        ]},
        {path:'/myter',component:myter,},
        {path:'/login',component:login,},
        {path:'/register',component:register},
        {path:'/pay',component:pay},
        {path:'/classlist',component:classlist},
        // {path:'/home',component:home},
        {path:'/free',component:free,children:[
            {path:'/recommended',component:recommended},
            {path:'/boy',component:boy},
            {path:'/girl',component:girl},

        ]},
        {path:'/classify',component:classify,children:[
            {path:'/male',component:male},
            {path:'/female',component:female},
            {path:'/publish',component:publish},

        ]},
        {path:'/details',component:details},
        {path:'/search',component:search},
    ]
})

export default router