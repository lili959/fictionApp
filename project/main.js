//这是入口文件

//导入jquery
import $ from 'jquery';
import './static/css/index.css';
import './static/css/aa.css';

import Vue from './node_modules/vue/dist/vue';
import VueRouter from 'vue-router';
import Mint from 'mint-ui'; 
import VueResource from "vue-resource"
import md5 from "js-md5"
Vue.prototype.$md5 = md5;
Vue.use(VueRouter);
Vue.use(Mint);
Vue.use(VueResource);
import './components.js'
import './node_modules/mint-ui/lib/style.css'
import './node_modules/vant/lib/index.css'
import index from './vue/App.vue'
// import { Button } from 'vant';

import router from "./router.js"
new Vue({
    el:'#app',
    data:{},
    render:a=>a(index),
    router,
});
