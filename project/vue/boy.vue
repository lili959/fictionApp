<template>
    <div id="recommended">
		<div class="boyHead">
			<div>
				<img src="" alt="" width="100%" @error="loadFailed($event)">
				<span>都市</span>
			</div>
			<div>
				<img src="" alt="" width="100%" @error="loadFailed($event)">
				<span>玄幻</span>
			</div>
			<div>
				<img src="" alt="" width="100%" @error="loadFailed($event)">
				<span>悬疑</span>
			</div>
			<div>
				<img src="" alt="" width="100%" @error="loadFailed($event)">
				<span>修仙</span>
			</div>
		</div>

		<!-- 新书热推 -->
		<div class="hot">
            新书热推
        </div>
        <div class="push">
			<router-link :to="'/details?id='+key.id" tag="div" v-for="key in list1" :key="key.index">
                <img :src="key.picture" width="100%" alt="" @error="loadFailed($event)">
                <div class="pushText">
                    <span>{{key.booksname}}</span>
                    <span>27.4万人在读</span>
                </div>
			</router-link>
        </div>
		
		<!-- 都市生活 -->
		<div class="theCity">
			<div class="theCity_a">都市生活</div>
			<div class="urbanNovels">
				<router-link :to="'/details?id='+key.id" tag="div" class="urbanNovels_a" v-for="key in list2" :key="key.index">
                	<img :src="key.picture" width="100%" alt="" @error="loadFailed($event)">
					<div>
						<span>{{key.booksname}}</span>
						<span>{{key.descr}}</span>
						<div class="bookInfo">
							<span>{{key.author}}</span>&nbsp; / &nbsp;
							<span>连载中</span>&nbsp; / &nbsp;
							<span>{{key.typename}}</span>
						</div>
					</div>
				</router-link>
			</div>
			<div class="urbanNovels_b">查看更多</div>
		</div>
		

    </div>
</template>
<script>
	import $ from 'jquery';
    export default {
		data() {
			return {
			active: 'boy',
			list:[],
			list1:[],
			list2:[],
			}
		},
		created:function(){
			this.getboyclass();
		},
        methods:{
            getboyclass(){
                var that = this;
                    this.$http.get("http://localhost:8080/getbooks").then(function(result){
                        //  console.log(result.body);
                         for(var i=0;i<result.body.length;i++){
                            //  console.log(result.body[i]);
                            this.list.push(result.body[i]);
                         }
                        this.booksClass();
                        // console.log(this.list);
                        
                    })
            },
            booksClass(){
                var that =this;
				for(var i=30;i<40;i++){
					that.list1.push(that.list[i])
				}
				for(var i=40;i<45;i++){
					that.list2.push(that.list[i])
				}
			},
			loadFailed(e){
				// $('img').on('error',function(){
				// 	$(this).unbind('error');
				// 	$(this).attr('src','static/images/1.jpg');
				// })
				// console.log($(e.path));
				$(e.path[0]).attr('src','static/images/2.jpg');
			}
        }
	};
</script>
<style scoped>
	#recommended{
		width: 100%;
		height: 78vh;
		padding: 0 5vw;
		/* background: pink; */
		overflow: scroll;
	}
	.boyHead{
		width: 100%;
		/* background: chartreuse; */
		margin-bottom: 6.5vw;
		margin-top: 2vw
	}

	.boyHead div{
		position: relative;
		width: 22%;
		height: 25vw;
		display: inline-block;
		background: #EFEFEF;
		margin: 0 0.8vw;
		border-radius: 1vw;
		position: relative;
	}
	.boyHead img{
		width: 100%;
		border-radius: 1vw;
	}
	.boyHead span{
		position: absolute;
		margin-top: 2vw;
		font-size: 4vw;
		color: #fff;
		margin-left: -17.5vw; 
	}

	/* 新书热推 */
	.hotPush{
		width: 100%;
		/* background: yellowgreen; */
	}
	.hot{
		width: 100%;
		font-size: 4.5vw;
		font-weight: bold;
	}

	.push{
		width: 100%;
		height: 113vw;
		margin-top: 4vw;
		/* background: #e95e3b */
	}

	.push div{
		width: 50%;
		float: left;
		margin-bottom: 2vw;
		/* background: steelblue; */
	}

	.push img{
		width: 30%;
		height: 18vw;
		background: #EFEFEF;
		float: left;
		border-radius: 1vw;
	}

	.push .pushText{
		margin-left: 3vw;
	}
	.pushText span{
		display: block;
		width: 115%;
		margin-top: 0.5vw;
		font-size: 4vw;
	}
	.pushText span:nth-child(2){
		font-size: 2vw;
		color: #b3b2b2;
		margin-top: 2vw;
	}
	

	/* 都市生活 */
	.theCity{
		width: 100%;
		height: 100vw;
		/* position: relative; */
		/* background: chocolate; */
		margin-top: 5vw;
	}

	.theCity_a{
		width: 100%;
		/* position: relative; */
		font-size: 4.5vw;
		font-weight: bold;
		margin-bottom: 3vw;
	}

	.urbanNovels{
		width: 100%;
	}

	.urbanNovels_a{
		margin: 2vw 0;
	}
	.urbanNovels_a img{
		width: 22%;
		height: 25vw;
		background: #EFEFEF;
		float: left;
		border-radius: 1vw;
	}

	.urbanNovels_a div{
		width: 73%;
		float: left;
		height: 25vw;
		margin-bottom: 4vw;
		margin-left: 2.5vw;
	}
	.urbanNovels_a span{
		display: block;
		font-size: 4vw;
		color: black;
	}
	.urbanNovels_a span:nth-child(2){
		font-size: 3vw;
		margin-top: 2.5vw;
		display: -webkit-box;             /*将对象转为弹性盒模型展示*/
		-webkit-box-orient: vertical;     /*设置弹性盒模型子元素的排列方式*/
		-webkit-line-clamp: 2;            /*限制文本行数*/
		overflow: hidden;                 /*超出隐藏*/
		color: #3b3b3b;
	}
	.urbanNovels_a .bookInfo{
        font-size: 3vw;
        color: #999999;
		margin: 0;
		margin-top: 3vw;
		/* background: #e95e3b */
		width: 65vw;
    }
    .urbanNovels_a .bookInfo span{
        font-size: 3vw;
        color: #999999;
        display: inline;
        margin: 0;
    }
	.urbanNovels_b{
		width: 100%;
		position: relative;
		text-align: center;
		font-size: 4vw;
		color: #e95e3b;
	}

</style>