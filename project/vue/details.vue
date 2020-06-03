<template>
    <div class="details">
		<div class="head">
			<router-link to="/free"><van-icon name="arrow-left" color="white" size="20px" ></van-icon></router-link>
			<span>
			<!-- <van-icon name="arrow-left" color="white" size="20px"></van-icon> -->
			<router-link to="/home"><van-icon name="bar-chart-o" color="white" size="20px" ></van-icon></router-link>
			</span>
			<router-link to="/free"><van-icon name="home-o" color="white" size="20px" ></van-icon></router-link>
		</div>

		<div class="title" v-for="key in list" :key="key.index" >
			<div class="titleImg">
				<img :src="key.bookimg" style="width:100%; height:100%">
			</div>
			<div class="titleRight">
				<p>{{key.name}}</p>
				<div class="titleRight_a">
					<span>{{key.author}}</span> |
					<span>武侠修仙</span> |
					<span v-if="key.state = 1">连载中</span>
					<span v-else>完结</span>
				</div>
				<p>{{key.addtime}}</p>
			</div>
		</div>

		<!-- 简介 -->
		<div class="text" v-for="key in list" :key="key.index">
			<p> {{key.descr}}</p>
		</div>

		<!-- 目录 -->
		<div class="directory">
			<div class="directory_a">
				<span>目录</span>
				<span>共{{list1.length}}章</span>
			</div>
			<div class="directory_b">
				<ul>
					<li v-for="key in list2" :key="key.index">
						<router-link :to="'/read?url='+key.url+'&id='+id" tag="span">{{key.num}}</router-link>
						<span class="prompt">免费</span>
					</li>
				</ul>

			</div>
			<div class="directory_c">
				<span class="page" @click="firstPage()">首页</span>
				<span class="page" @click="pre()">上一页</span>
				<span>{{n}}/{{page}}</span>
				<span  @click="next()">下一页</span>
				<span @click="lastPage()">尾页</span>
			</div>
		</div>
		
		<div class="ending">
			<span @click="addbooks()">加入书架</span>
			<span>免费试读</span>
			<span>离线全本</span>
		</div>
	</div>
</template>
<script>
	import $ from 'jquery';
	// import 'bootstrap/dist/css/bootstrap.css';
    export default {
	data() {
		return {
		// active: 'details'
			list:[],
			list1:[],
			list2:[],
			page:null,
			n:1,
			id:null,
			code:null,
		}
	}, 
	created:function(){
		this.id = this.$route.query.id;
		this.getBooksDetails();
		
	},
	methods:{
		addbooks(){
			this.code = localStorage.getItem("code");
			console.log(this.code);
		},
		getBooksDetails(){
			var that = this;
			this.$http.get("http://localhost:8080/bookscata/"+ this.id).then(function(result){
				
				for(var i=0;i<result.body.length;i++){
					that.list.push(result.body[i]);
				}
				console.log(that.list[0]);
				that.getList();
			});
		},
		getList(){
			var that = this;
			that.$http.get("http://api.pingcc.cn?xsurl1=" + that.list[0].url).then(function(result){
				for(var i=0;i<result.data.list.length;i++){
					that.list1.push(result.data.list[i]);
					
				}
				// console.log(result.data.list);
				// console.log(that.list1);
				for(var i=0;i<10;i++){
					that.list2.push(that.list1[i]);
					
				}
				// console.log(that.list2);
				
				var num = that.list1.length / 10;
				that.page = Math.ceil(num);
				// console.log(that.page);
				
			});
		},
		next(){
			var that = this;
			if(that.n<that.page){
				that.list2.splice(0);
				for(var i=10*that.n;i<10*(that.n+1);i++){
					if(that.list1[i] != null)
					that.list2.push(that.list1[i]);
				}
				$('.page').removeClass('page');

				that.n +=1;
				if(that.n == that.page){
					// console.log(that.n);
					
					$('.directory_c span').eq(3).addClass('page').next().addClass('page');
				}
			}else{
			}
		},
		pre(){
			var that = this;
			if(that.n > 1){
				that.list2.splice(0);
				for(var i=10*(that.n-2);i<10*(that.n-1);i++){
					if(that.list1[i] != null)
					that.list2.push(that.list1[i]);
				}
				$('.page').removeClass('page');

				that.n -=1;
				if(that.n == 1){
					// console.log(that.n);
					
					$('.directory_c span').eq(0).addClass('page').next().addClass('page');
				}
			}else{
			}
		},
		firstPage(){
			var that = this;
			that.n = 2;
			that.pre();
			// console.log(111);
			
		},
		lastPage(){
			var that = this;
			that.n = that.page-1;
			that.next();
		}
	}
};

</script>
<style scoped>
	.details{
		width: 100%;
		height: 91vh;
		margin-bottom: 15vw;
		overflow: scroll;
		/* background: olive; */
	}

	.head{
		width: 100%;
		/* background-color: #817a72; */
		background: #817a72ce;
		position: relative;
		padding: 0 3.5vw;
	}
	.head span{
		font-size: 4.5vw;
		color: #fff;
		display: inline-block;
		line-height: 11vw;
	}
	.head span:nth-child(2){
		margin-left: 75%;
	}
	/* .head span:nth-child(3){
		position: absolute;
		right: 0;
		padding-right: 5vw;
	} */


	.title{
		width: 100%;
		background: #817a72ce;
		padding: 0 5vw;
		padding-top: 5vw;
	}

	.titleImg{
		width: 26vw;
		height: 32vw;
		background: #EFEFEF;
		border-radius: 1vw;
		display: inline-block;
	}
	.titleImg img{
		border-radius: 1vw;
		width: 100%;
	}

	.titleRight{
		float: right;
		/* background: slateblue; */
		width: 67%;
		color: #ffffff;
	}
	.titleRight p:nth-child(1){
		margin: 0;
		font-size: 4.5vw;
		line-height: 11vw;
	}
	.titleRight p:nth-child(2){
		font-size: 3vw;
		margin-top: 2vw;
	}

	.titleRight_a span{
		font-size: 3vw;
	}

	/* 简介 */
	.text{
		width: 100%;
		/* background: steelblue; */
		margin-top: 5vw;
		padding: 0 5vw;
	}
	.text p{
		width: 100%;
		/* height: 30vw; */
		/* background: #ff453c; */
		display: block;
		display: -webkit-box;             /*将对象转为弹性盒模型展示*/
		-webkit-box-orient: vertical;     /*设置弹性盒模型子元素的排列方式*/
		-webkit-line-clamp: 5;            /*限制文本行数*/
		overflow: hidden;                 /*超出隐藏*/
		font-size: 4vw;
		line-height: 6.5vw;
		color: #000;
	}

	/* 目录 */
	.directory{
		width: 100%;
		/* background: #ff342a; */
		padding: 0 5vw;
		margin-top: 5vw;
	}
	.directory_a{
		width: 100%;
		border-bottom: 1px solid #f4f4f4;
	}
	.directory_a span{
		line-height: 9vw;
	}
	.directory_a span:nth-child(1){
		font-size: 5vw;
		color: #262626;
		font-weight: normal;
	}
	.directory_a span:nth-child(2){
		font-size: 3.5vw;
		color: #999;
		margin-left: 2vw;
	}

	.directory_b{
		width: 100%;
	}
	.directory_b ul{
		border-bottom: 1px solid #f4f4f4;
		padding: 1vw 0;
	}
	.directory_b li{
		line-height: 10vw;
		font-size: 4vw;
		color: #222;
		/* background: springgreen; */
	}
	.directory_b .prompt{
		color: #b9b9b9;
		font-size: 3vw;
		float: right;
	}

	.directory_c{
		width: 100%;
		line-height: 8vw;
	}
	.directory_c span{
		width: 16%;
		/* background: slateblue; */
		display: inline-block;
		text-align: center;
		font-size: 4vw;
		color: #333;
	}
	.directory_c span:nth-child(3){
		width: 27%;
	}
	.directory_c .page{
		color: #999;
	}

	/* 底部 */
	.ending{
		width: 100%;
		height: 15vw;
		position: fixed;
		bottom: 0;
		box-shadow: 0 0 5px 0 rgba(214,214,214,0.51);
		background-color: #fff;	
		z-index: 10;
	}
	.ending span{
		width: 33.3%;
		display: block;
		font-size: 4.5vw;
		text-align: center;
		/* background: slateblue; */
		float: left;
		line-height: 15vw;
		color: #ff453c;
	}
	.ending span:nth-child(2){
		height: 13vw;
		color: #fff;
		background: linear-gradient(to left,#ff342a,#ff7734);
		border-radius: 12vw;
		margin-top: 1vw;
		line-height: 13vw;
	}
</style>