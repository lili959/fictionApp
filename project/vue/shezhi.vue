<template>
    <div class="tc">
        <div class="sz">
            <van-nav-bar
                title="设置"
                left-arrow
                color="#000"
                @click-left="onClickLeft"
            />
            <div class="sz_Af">
                <p class="sz_Af_p"><span>亮度</span><span></span><span><van-slider v-model="value" active-color="#FF3300"><div slot="button" class="van-slider_button"></div></van-slider></span><span></span></p>
            </div>
            <div class="sz_Bf">
                <p class="p1">阅读设置<span class="main_icon"></span></p>
                <p class="p1">通知提醒<span class="main_icon"></span></p>
                <p class="p1">阅读兴趣<span class="Bf_span">男频 小说</span><span class="main_icon"></span></p>
                <p class="p1">连载提醒<span class="main_icon"></span></p>
                <p class="p1">自动购买<van-switch v-model="checked" active-color="#07c160" inactive-color="#CCCCCCCC" size="20px" /></p>
            </div>
            <div class="sz_Cf">
                <p class="p1">应用推荐<span class="main_icon"></span></p>
                <p class="p1">手机一键优化<span class="main_icon"></span></p>
            </div>
            <div class="sz_Df">
                <p class="p1">关于<span class="main_icon"></span></p>
            </div>
            <p class="sz_p">切换账户</p>
            <p class="sz_p exit_login" @click="exit()">退出登录</p>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import { Dialog } from 'vant';
export default {
    data(){
        return {
            value:100,
			checked:false,
        }
    },
    methods:{
        onClickLeft(){
			$('.tc').animate({left:'100vw'},500,function(){
				$('.tc').hide();
			});
		},
		exit(){
			Dialog.confirm({
				title: '确定要退出登录吗？',
				message: '签到、阅读付费书等功能需要登录才能使用，是否确认退出？',
				confirmButtonText:'退出登录',
				confirmButtonColor:'#FF3300'
			}).then(() => {
				this.exits();
			}).catch(() => {
			// on cancel
			});
		},
		exits(){
			$('.sz_p').eq(1).addClass('exit_login');
			localStorage.removeItem('code');
			this.$router.push('/login');
			// location.reload();
		}
	},
	components:{
		Dialog: Dialog.Component
	},
	mounted(){
		var code = localStorage.getItem("code");
		if(code){
			$('.sz_p').eq(1).removeClass('exit_login');
		}
	}
}
</script>
<style  scoped>
.tc{
	width: 100vw;
	height: 100vh;
	background: rgb(245, 245, 245);
	position: fixed;
	top: 0;
	left:100vw;
	bottom: 0;
	z-index: 5;
	display: none;
}
.sz{
	width: 100%;
	background: #CCCCCC4D;
	height: 100%	;
	position: absolute;
	top: 0;
	bottom: 0;
}
.van-nav-bar .van-icon{
	color: #000;
}
.van-nav-bar__title{
	max-width:100%;
}
.sz_Af{
	margin-top: 6px;
	background: #fff;
	margin-bottom: 6px;
}
.sz_Af_p{
	font-size: 16px;
    padding: 15px 15px 15px 20px;
    position: relative;
    color: #323232;
    position: relative;
}
.van-slider, .van-slider__bar{
	width: 60%;
	position: absolute;
	top: 24px;
	left: 79px;
}
.van-slider__bar{
	background-color: #FF3300;
}
.van-slider_button{
	width: 14px;
	height: 14px;
	border-radius: 50%;
	background-color: #FF3300;
}
.van-switch__node{
	top: -1px;
}
.sz_Af_p span:nth-child(2){
	display: inline-block;
	width: 15px;
	height: 15px;
	background: url('../src/assets/ld.png') no-repeat;
	background-size: 100% 100%;
	margin-left: 5px;
}
.sz_Af_p span:nth-child(4){
	display: inline-block;
	width: 22px;
	height: 22px;
	background: url('../src/assets/ld.png') no-repeat;
	background-size: 100% 100%;
	position: absolute;
	right: 10px;
}
.sz_Bf,.sz_Cf,.sz_Df{
	background: #fff;
	margin-bottom: 6px;
}
.van-switch{
	position: absolute;
	right: 10px;
}
.sz_p{
	font-size: 15px;
	padding: 15px 15px 10px 20px;
	position: relative;
	color: #323232;
	text-align: center;
	position: relative;
	background: #fff;
	margin-bottom: 6px;
}
.exit_login{
	display: none;
}
 [class="p1"]{
	margin: 0;
	font-size: 15px;
	padding: 15px 15px 10px 20px;
	position: relative;
	color: #323232;
	position: relative;
}
</style>