<template>
    <div class="warp1">
        <div class="header1">
            <span @click="prev"></span>
            <h3>登录</h3>
        </div>
        <form class="my_form">
            <p class="login_cw">
                <span>账号或者密码错误</span>
            </p>
            <p>
                <input type="text" v-model="username" @keyup="ltup()" @focus="foucus" autofocus="true" placeholder="手机号">
                <span class="text_clear" @click="clearText"></span>
            </p>
            <p>
                <input type="password" v-model="passwd" @keyup="ltup()" @focus="foucus" placeholder="密码(6-16位区分大小写)">
                <span class="text_yc" @click="soHd"></span>
            </p>
        </form>
        <div class="form_m">
            <span>忘记密码</span>
            <span>短信验证码登录</span>
        </div>
        <div class="login" @click="login">
             登录
        </div>
        <router-link to="/register" tag="div" class="register">快速注册</router-link>
        <div class="fw">
            <p>
                <input type="checkbox" class="my_input" @click="chooseCheck">
                <span>我已了解并接受用户服务及隐私政策</span>
            </p>
        </div>
        <!-- <div class="registers"> -->
             <!-- <transition name="fade">
                <router-view></router-view>
            </transition> -->
        <!-- </div> -->
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    data(){
        return {
            username:'',
            passwd:'',
            i:1,
            j:1
        }
    },
    methods:{
        ltup(){
            if(this.username != ''){
                $('.text_clear').show();
            }else{
                $('.text_clear').hide();
            }
            if(this.username != '' && this.passwd != '' && this.passwd.length >= 6 ){
                $('.login').css({background:'#FF3300'});
                $('.login').attr({data_value:1});
            }else{
                $('.login').css({background:'rgb(168, 167, 167)'});
            }
        },
        clearText(){
            this.username = '';
            $('.text_clear').hide();
            $('.login').css({background:'rgb(168, 167, 167)'});
        },
        chooseCheck(){
            if(this.i == 1){
                $('.my_input').addClass('gf');
                this.i = 2;
            }else{
                $('.my_input').removeClass('gf');
                this.i = 1;
            }
        },
        soHd(){
            if(this.j == 1){
                 $('.text_yc').addClass('text_xs');
                 $('.text_yc').prev().attr('type','text');
                this.j = 2;
            }else{
                 $('.text_yc').removeClass('text_xs');
                 $('.text_yc').prev().attr('type','password');
                this.j = 1;
            }
        },
        prev(){
            this.$router.push('/myter');
        },
        foucus(){
            $('.login_cw').hide();
        },
        login(){
            var code = $('.login').attr('data_value');
            if(code == 1){
                var passwd = this.$md5(this.passwd);
                // console.log(passwd);
                this.$http.get('http://localhost:8080/login',{params:{username:this.username,passwd:passwd}}).then((result)=>{
                    // console.log(result);
                    if(result.body.code == 0){
                        $('.login_cw').show();
                    }else if(result.body.code == 1){
                        localStorage.setItem("code",this.username);
                        this.$router.push('/myter');
                        // location.reload();
                    }
                })
            }
        }
    },
}
</script>
<style scoped>
    .warp1{
        position: fixed;
        bottom: 0;
        left: 0;
        /* position: relative; */
        width: 100%;
        height: 100vh;
        background: #fff;
        z-index: 2;
    }
    .header1{
        padding: 10px 6px;
        text-align: center;
        position: relative;
        color: black;
        margin-bottom: 10px;
    }
    .header1 span::after{
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        background: url('../src/assets/left1.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 10px;
        left: 6px;
    }
    .header1 h3{
        margin: 0;
        margin-top: -4px;
        font-size: 21px;
        font-weight: 500;
    }
    .van-field__control{
           caret-color: blue;
    }
    .my_form{
        width: 100%;
    }
    .my_form p{
        margin: 0;
        position: relative;
    }
    .my_form input{
        width: 90%;
        border: none;
        margin-left: 20px;
        padding: 15px 0px;
        border-bottom: 1px solid rgba(150, 148, 148,.2);
        caret-color:steelblue;
        /* font-size: 16px; */
    }
    .login_cw{
        padding-left: 20px;
        font-size: 12px;
        color: red;
        display:none;
    }
    .text_clear{
        display: none;
    }
    .text_clear::after{
        position: absolute;
        right: 22px;
        top: 16px;
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: url('../src/assets/clear.png');
        background-size: 100% 100%;
    }
    .text_yc::after{
        position: absolute;
        right: 22px;
        top: 16px;
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: url('../src/assets/yc.png');
        background-size: 100% 100%;
    }
    .text_xs::after{
        background: url('../src/assets/xs.png');
        background-size: 100% 100%;
    }
    .form_m{
        margin-top: 10px;
        position: relative;
        margin-bottom: 40px;
    }
    .form_m span{
        font-size: 12px;
        color: black;
        font-weight: 600;
    }
    .form_m span:nth-child(1){
        margin-left: 20px;
    }
    .form_m span:nth-child(2){
        position: absolute;
        top: 5px;
        right: 15px;
    }
    .login{
        width: 75%;
        margin: 0 auto;
        height: 35px;
        text-align: center;
        background: rgb(168, 167, 167);
        border-radius: 35px;
        color: #fff;
        font-size: 18px;
        line-height: 35px;
        margin-bottom: 20px;
    }
    .register{
        width: 75%;
        margin: 0 auto;
        height: 35px;
        text-align: center;
        border-radius: 35px;
        font-size: 16px;
        line-height: 35px;
        margin-bottom: 20px;
        border: 1px solid rgba(0, 0, 0, .5);
        box-shadow: 0 0 2px rgba(0, 0, 0, .5);
    }
    .fw{
        width: 100%;
        position: absolute;
        bottom: 8px;
    }
    .fw p{
        margin: 0 auto;
        text-align: center;
        position: relative;
    }
    .my_input {
        cursor: pointer;
        position: relative;
        width: 1rem;
        height: 1rem;
        font-size: 0.3rem;
        visibility: hidden;
    }
    .my_input::after {
        position: absolute;
        top: 4px;
        left: 3px;
        background: url('../src/assets/g2.png');
        background-size: 100% 100%;
        border: 1px solid #ccc;
        color: rgba(0, 0, 0, .5);
        width: 0.8rem;
        height: 0.8rem;
        display: inline-block;
        visibility: visible;
        padding-left: 0px;
        text-align: center;
        content: '';
        border-radius: 50%;
    }
    .gf::after{
        background: url('../src/assets/g1.png');
        background-size: 100% 100%;
    }
    .fw p span{
        margin-left: -5px;
        font-size: 12px;
        color: rgba(0, 0, 0, .5);
    }
    /* 过渡 */

</style>
