<template>
	<div id="warp">
		<!-- 头部 -->
		<div class="header">
			<van-icon class="header_xx" name="chat-o" color="#FFF" size="20px" />
			<van-icon class="header_icon" @click="showTc" name="setting-o" color="#FFF" size="20px"/>
			<div class="header_user">
				<div class="user_main">
					<div class="user_tx">
						<img :src="src">
					</div>
					<div class="user_nam">
						<p class="user_name">{{name}}</p>
						<router-link to="/login" tag="p" class="logins">{{vip}}</router-link>
						<!-- -->
					</div>
					<div class="user_vip">VIP免费领</div>
				</div>
				<div class="user_footer">
					<p>开通VIP尊享<span>5</span>大权益，追书更嗨!</p>
				</div>
			</div>
		</div>
		<!-- 主体 -->
		<div class="main">
			<div class="main_Af">
				<div class="main_Af_sd">
					<p>{{num}}</p>
					<span>我的搜豆</span>
				</div>
				<div class="main_Af_js">
					<p>0</p>
					<span>今日搜豆</span>
				</div>
				<div class="main_Af_jy">
					<p>0</p>
					<span>今日阅读(分钟)</span>
				</div>
			</div>
			<div class="main_Bf">
				<p class="p1">我的账号<span class="Bf_span">去充值</span><span class="main_icon"></span></p>
				<p class="p1">每日福利<span class="main_icon"></span></p>
			</div>
			<div class="main_Cf">
				<p class="p1">浏览记录<span class="main_icon"></span></p>
				<p class="p1">云书架<span class="main_icon"></span></p>
				<p class="p1">网页收藏<span class="main_icon"></span></p>
			</div>
			<div class="main_Df">
				<p class="p1">个性换肤<span class="Bf_span">素雅白</span><span class="main_icon"></span></p>
				<p class="p1">意见反馈<span class="main_icon"></span></p>
			</div>
		</div>
		<!-- tabber标签 -->
		<!-- <van-tabbar v-model="active" active-color="#FF3300"> -->
			<!-- <van-tabbar-item name="home" ><span class="sj"></span>书架</van-tabbar-item>
			<van-tabbar-item name="search"><span class="sc"></span>书城·免费</van-tabbar-item> -->
			<!-- <van-tabbar-item name="home" icon="home-o">书架</van-tabbar-item>
			<van-tabbar-item name="search" icon="newspaper-o">书城·免费</van-tabbar-item>
			<van-tabbar-item name="friends" icon="diamond-o">书城·付费</van-tabbar-item>
			<van-tabbar-item name="setting" icon="manager-o">我的</van-tabbar-item>
		</van-tabbar> -->
		<!-- 设置 -->
		<shezhi></shezhi>	
		<!-- <router-view></router-view>  -->
	</div>
</template>
<script>
import $ from 'jquery';
import shezhi from './shezhi.vue'
export default {
	data() {
		return {
			active: 'home',
			show: false,
			value:100,
			checked:false,
			name:'游客4036680269',
			num:0,
			src:"../src/assets/1.jpg",
			vip:'请登录/注册'
		}
	},
	methods: {
		showPopup() {
		this.show = true;
		// console.log(this.show);
		},
		onClickLeft(){
			$('.tc').animate({left:'100vw'},500,function(){
				$('.tc').hide();
			});
		},
		showTc(){
			$('.tc').show();
			$('.tc').animate({left:'0vw'},500);
		},
		click1(){
			this.popupVisible = true;
		},
	},
	created(){
		var code = localStorage.getItem("code");
		if(code){
			// console.log(code);
			this.$http.get('http://localhost:8080/myter/'+code+'').then((result)=>{
				// console.log(result.body[0]);
				this.name = result.body[0].name;
				this.num = result.body[0].num;
				this.vip = '你还不是VIP用户';
				this.src = "../src/assets/0.jpg";
			});
		}
		
	},
	components:{
		shezhi
	}

};
$(function(){
	var height = $(document).height();
	var height1 = $('.header').outerHeight();
	$('.main').css({height:height-height1-50+'px'});
})
</script>
<style scoped>
	*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#warp{
	/* overflow: hidden; */
	position: fixed;
	top: 0;
	/* left: 0; */
	bottom: 50px;
	/* height: 100%; */
	width: 100%;
	/* z-index: 2; */
}
.header{
	position: relative;
    width: 100%;
    height: 120px;
	background: black;
	padding-top: 15px;
	z-index: 1;
	
}
.sj:before{
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    text-align: center;
    background: url('../src/assets/shujia.png') no-repeat;
    background-size: 100% 100%;
}
.sc:before{
    content: '';
    display: block;
    width: 22px;
    height: 22px;
    margin: 0 auto;
    background: url('../src/assets/sc.png') no-repeat;
	background-size: 100% 100%;
}
.header_xx{
	position: absolute;
	right: 45px;
	transform: rotateY(180deg);
}
.header_icon{
	position: absolute;
	right: 15px;
}
.header_user{
	width: 95%;
	height: 100px;
	background: #ccc;
	border-radius: 10px;
	margin:30px auto 0; 
	padding: 5px 20px 10px;
	
}
.user_main{
	height: 60px;
	border-bottom: 1px solid rgba(20, 20, 20, .1);
	
}
.user_footer p{
	font-size: 10px;
	text-align: center;
	padding-top: 10px;
}
.user_footer p span{
	font-size: 17px;
	font-weight: bold;
	color: black;
}
.user_tx{
	width: 40px;
	height: 40px;
	border-radius: 50%;
	margin-top: 5px;
	/* background: orange; */
	float: left;
}
.user_tx img{
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-size: 100% 100%;
}
.user_nam{
	float: left;
	padding-top: 10px;
	margin-left: 10px;
}
.user_name{
	font-size: 13px;
	font-weight: 500;
}
.logins{
	font-size: 13px;
	transform: scale(0.8);
	text-align: left;
	margin-left: -10px;
}
.user_vip{
	float:right;
	margin-top: 15px;
	width: 80px;
	height: 20px;
	text-align: center;
	background: rgba(20, 20, 20, 1);
	color: #FFCC00CC;
	line-height: 20px;
	font-size: 12px;
	border-radius: 10px;
}
.main{
	width: 100%;
	background: #CCCCCC4D;
	/* height: 80vh; */
	position: relative;
}
.main_Af{
	width: 100%;
	height: 90px;
	background: #fff;
	margin-bottom: 6px;
	padding-top: 40px;
}
.main_Af div{
	width: 33.3%;
	height: 100%;
	float: left;
	text-align: center;
}
.main_Af div p{
	font-size: 18px;
	font-weight: bold;
	color: #323232;
}
.main_Af div span{
	display: block;
	font-size: 8px;
	transform: scale(0.8);
}
.main_Bf{
	width: 100%;
	height: 100px;
	background: #fff;
	margin-bottom: 6px;
}

.main_Cf{
	background: #fff;
	margin-bottom: 6px;
}

.main_Df{
	background: #fff;
}
.Bf_span{
	position: absolute;
	font-size: 14px;
	color:rgba(20, 20, 20, .6);
	right: 40px;
}
 [class="p1"]{
	font-size: 15px;
	padding: 15px 15px 10px 20px;
	position: relative;
	color: #323232;
	position: relative;
}
.main_icon{
	display: block;
	width: 15px;
	height: 15px;
	position: absolute;
	right: 10px;
	top: 18px;
	background: url('../src/assets/right1.png') no-repeat;
	background-size: 100% 100%;
}
</style>


