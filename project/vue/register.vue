<template>
    <div class="warp">
        <div class="header">
            <span @click="prev"></span>
            <h3>快速注册</h3>
        </div>
        <form class="my_form">
            <p>
                <input type="text" v-model="name" @keyup="ltup(1)"  autofocus="true"  placeholder="用户名">
                <span class="text1_clear" @click="clearName"></span>
            </p>
            <p>
                <span class="email_cw">邮箱输入格式错误</span>
                <input type="email" v-model="email" @keyup="ltup(2)" @blur="judgeEamil" @focus="hideEm"   placeholder="电子邮箱">
            </p>
            <p>
                <span class="phone_cw">手机号格式错误</span>
                <input type="text" v-model="username" @keyup="ltup(3)" @blur="judgePhone" @focus="hidePh" placeholder="手机号">
                <span class="text_clear" @click="clearText"></span>
            </p>
            <p>
                <span class="passwd_cw">密码输入格式错误</span>
                <input type="password" v-model="passwd" @keyup="ltup(4)" @blur="judgePasswd" @focus="hidePw"  placeholder="密码(6-16位区分大小写)">
                <span class="text_yc" @click="soHd"></span>
            </p>
        </form>
        <div class="register" @click="zhuce">
             注册
        </div>
        <div class="fw">
            <p>
                <input type="checkbox" class="my_input" @click="chooseCheck">
                <span>我已了解并接受用户服务及隐私政策</span>
            </p>
        </div>
        <div class="sucess">
            <span></span>
            <p>注册成功</p>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    data(){
        return {
            name:'',
            email:'',
            username:'',
            passwd:'',
            i:1,
            j:1,
            re:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            ph:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            patten:/^[\w_-]{6,16}$/
        }
    },
    methods:{
        clearText(){
            this.username = '';
            $('.text_clear').hide();
        },
        clearName(){
            this.name = '';
            $('.text1_clear').hide();
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
        judgeEamil(){
            if(this.re.test(this.email)){
                return true;
            }else{
                $('.email_cw').show();
            }
        },
        judgePhone(){
            if(this.ph.test(this.username)){
                return true;
            }else{
                $('.phone_cw').show();
            }
        },
        judgePasswd(){
            if(this.patten.test(this.passwd)){
                return true;
            }else{
                $('.passwd_cw').show();
            }
        },
        hideEm(){
            $('.email_cw').hide();
        },
        hidePh(){
            $('.phone_cw').hide();
        },
        hidePw(){
            $('.passwd_cw').hide();
        },
        ltup(code){
            if(code == 1){
                if(this.name != ''){
                $('.text1_clear').show();
                }else{
                    $('.text1_clear').hide();
                }
            }else if(code == 2){
                
            }
            if(this.username != ''){
                $('.text_clear').show();
            }else{
                $('.text_clear').hide();
            }
            
            if(this.username != '' && this.passwd != '' && this.name != '' && this.email != '' && this.passwd.length >= 6  && this.passwd.length <=16){
                if(this.judgeEamil() && this.judgePhone() && this.judgePasswd()){
                    $('.register').css({background:'#FF3300'});
                    $('.register').attr({data:'kk'});
                }
            }else{
                $('.register').css({background:'rgb(168, 167, 167)'});
                $('.register').removeAttr('data');
                return false;
            }
        },
        prev(){
            this.$router.go(-1);
        },
        toToact(){
            $('.sucess').show();
        },
        zhuce(){
            var back = $('.register').attr('data');
            if(back == 'kk'){
                this.$http.post('http://localhost:8080/registers',{name:this.name,username:this.username,email:this.email,passwd:this.passwd},{emulateJSON:true}).then((result)=>{
                    // console.log(result);
                    if(result){
                        this.toToact();
                        setTimeout(() => {
                            this.$router.push('/login');
                            $('.sucess').hide();
                        }, 1000);
                    }else{
                        this.$Toast.fail('注册失败！');
                        
                    }
                })
            }
        }
    },
}
</script>
<style scoped>
    .warp{
        position: fixed;
        top: 0;
        left: 0;
        /* position: relative; */
        width: 100vw;
        height: 100vh;
        background: #fff;
        z-index: 3;
    }
    .header{
        padding: 10px 6px;
        text-align: center;
        position: relative;
        color: black;
        margin-bottom: 10px;
    }
    .header span::after{
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
    .header h3{
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
         margin-bottom: 50px;
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
    .email_cw,.phone_cw,.passwd_cw{
        margin-left: 20px;
        font-size: 12px;
        color: red;
        display: none;
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
    .text1_clear{
        display: none;
    }
    .text1_clear::after{
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
   .register{
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
    .sucess{
        width: 120px;
        height: 120px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -60px;
        margin-top: -250px;
        background: rgba(0,0,0,.6);
        display: none;
    }
    .sucess span{
        display: block;
        width: 50px;
        height: 50px;
        background: url('../src/assets/tocat.png') no-repeat;
        background-size: 100% 100%;
        margin: 20px  auto 0;
    }
    .sucess p{
        font-size: 18px;
        text-align: center;
        color: #fff;
    }
    /* 过渡 */
    .fade-enter{
        left: 100%;
        opacity: 0;
    }
    .fade-enter-active{
        transition: all .5s ease;
    }

    .fade-enter-to{
        left: 0;
        opacity: 1;
    }
</style>
