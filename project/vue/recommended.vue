<template>
    <div id="recommended">
        <!-- 轮播 -->
        <div class="boxlist">
            <div class="list">
                <div class="shuffling" style="background:#d64f44" v-for="key in list4" :key="key.index">
                    <div class="img">
                        <img :src="key.picture" width="100%" alt="">        
                    </div>
                    <div class="title">
                        <span>{{key.booksname}}</span>
                        <span>{{key.descr}}</span>
                    </div>
                </div>
            </div>
            <div id="focusBox">
                <span class="focus"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        
        <!-- 分类 -->
        <div class="classification">
            <router-link tag="div" to="/classify">
                <span><img :src="images1" width="100%" alt=""></span>
                <span>分类</span>
            </router-link>
            <div>
                <span><img :src="images2" width="100%" alt=""></span>
                <span>排行</span>
            </div>
            <div>
                <span><img :src="images3" width="100%" alt=""></span>
                <span>完本</span>
            </div>
            <div>
                <span><img :src="images4" width="100%" alt=""></span>
                <span>热更</span>
            </div>
            <div>
                <span><img :src="images5" width="100%" alt=""></span>
                <span>福利</span>
            </div>
        </div>


        <!-- 今日必追 -->
        <div class="chase">
            <div class="willChase">
                <span>今日必追</span>
                <span>查看更多</span>
            </div>
            <div class="afterPlay">
                <router-link :to="'/details?id='+key.id" tag="div" v-for="key in list1" :key="key.index">
                    <div class="afterPlayImg">
                        <img :src="key.picture" width="100%" height="100%" alt="">
                        <p>53.4万人在追</p>
                    </div>
                    <span>{{key.booksname}}</span>
                    <span>{{key.author}}</span>
                </router-link>
            </div>
        </div>

        <!-- 今日热推 -->
        <div class="hotPush">
             <div class="hot">
                今日热推
            </div>
            <div class="push">
                <router-link :to="'/details?id='+key.id" tag="div" v-for="key in list2" :key="key.index">
                    <img :src="key.picture" width="100%" alt="">
                    <div class="pushText">
                        <span>{{key.booksname}}</span>
                        <span>27.4万人在读</span>
                    </div>
                </router-link>
               
            </div>
        </div>

        <!-- 热搜推荐 -->
        <div class="chase">
            <div class="willChase">
                <span>热搜推荐</span>
                <span>查看更多</span>
            </div>
            <div class="afterPlay">
                <router-link :to="'/details?id='+key.id" tag="div" v-for="key in list3" :key="key.index">
                    <div class="afterPlayImg">
                        <img :src="key.picture" width="100%" height="100%" alt="">
                        <p>53.4万人在追</p>
                    </div>
                    <span>{{key.booksname}}</span>
                    <span>{{key.author}}</span>
                </router-link>
            </div>
        </div>
        
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        data() {
            return {
            active: 'recommended',
            list:[], 
            list1:[],    
            list2:[],    
            list3:[],    
            list4:[],    
            // list5:[],  

            // 分类图片
            images1:'../../static/images/nav_fl.png',
            images2:'../../static/images/nav_ph.png',
            images3:'../../static/images/nav_mf.png',
            images4:'../../static/images/nav_zk.png',
            images5:'../../static/images/nav_zt.png',

            images6:'../../static/images/1.jpg',
            images7:'../../static/images/2.jpg',
            images8:'../../static/images/3.jpg',
            images9:'../../static/images/4.jpg',
            }
        },
        created:function(){
            this.getboyclass();
        },
        mounted:function(){
            this.carousel();
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
                    for(var i=0;i<4;i++){
                        that.list1.push(that.list[i])
                    }
                    // console.log(that.list1);
                    
                    for(var i=10;i<20;i++){
                        that.list2.push(that.list[i])
                    }
                    for(var i=20;i<24;i++){
                        that.list3.push(that.list[i])
                    }
                    for(var i=30;i<37;i++){
                        that.list4.push(that.list[i])
                    }
            },
            carousel(){
                // 获取节点
                var list = $('.list');
                var FB = $('#focusBox');
                list.css({left:'-90vw'});
        
                // 设置常数n 
                var n = 1;
        
                // 轮播动画无缝衔接
                setInterval(function(){
                    n++;
                    // console.log(n);
                    if (n < 6) {
                        list.animate({left:-90*n+'vw'});
                        // $(FB.children('span')).eq(n-1).addClass('focus').siblings().removeClass();
                    }else{
                        list.animate({left:-90*n+'vw'},function(){
                            list.css({left:'-90vw'});
                        });
                        n = 1;	
                    };
                    $(FB.children('span')).eq(n-1).addClass('focus').siblings().removeClass();
                },1500)
                
            }
        }
    };
   
</script>
<style  scoped>
    /* 推荐 */
    #recommended{
        width: 100%;
        height: 75vh;
        padding: 0 5vw;
        /* background: pink; */
        overflow: scroll;
        margin-top: 2vw;
    }

    .boxlist{
        width: 90vw;
        height: 25vw;
        position: relative;
        /* background: purple; */
        overflow: hidden;
        z-index: -1;
    }

    .list{
        width: 630vw;
        height: 25vw;
        position: absolute;
    }
    .shuffling{
        width: 90vw;
        background: #EFEFEF;
        border-radius: 2vw;
        padding: 0 5vw;
        /* float: left; */
        display: inline-block;
        z-index: 1;
    }
    
    .img img{
        width: 18vw;
        height: 22vw;
        float: left;
        margin-top: 3vw;
        background: #EFEFEF;
        border-top-left-radius: 1vw;
        border-top-right-radius: 1vw;
    }

    .title{
        /* margin-top: 3vw; */
        float: left;
        margin-left: 3.5vw;
    }
    .title span{
        display: block;
        width: 55vw;
        /* background: slategray; */
        margin: 3vw 0;
        font-size: 4vw;
        color: #fff;
    }

    .title span:nth-child(2){
        font-size: 2.5vw;
        display: -webkit-box;             /*将对象转为弹性盒模型展示*/
        -webkit-box-orient: vertical;     /*设置弹性盒模型子元素的排列方式*/
        -webkit-line-clamp: 1;            /*限制文本行数*/
        overflow: hidden;                 /*超出隐藏*/
    }

    #focusBox{
        width: 100%;
        position: absolute;
        bottom: 0;
        margin: 2vw auto;
        left: 40%;
        right: 50%;
    }
    #focusBox span{
        width: 1.5vw;
        height: 1vw;
        background: #ffffff93;
        border-radius: 20vw;
        z-index: 10;
        float: left;
        margin: 0 1vw;
    }

    #focusBox .focus{
        width: 2.5vw;
        height: 1vw;
        border-radius: 30vw;
        background: #ffffff;

    }


    /* 分类 */
    .classification{
        width: 100%;
        height: 15vw;
        /* background: rosybrown; */
        margin: 5vw 0;
    }
    .classification div{
        width: 20%;
        float: left;
        text-align: center;
    }
    .classification span{
        display: block;
        font-size: 3.5vw;
    }
    .classification img{
        width: 6vw;
        height: 6vw;
        margin-bottom: 2vw;
    }
    .nav-icon ul{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 23px 30px 15px;
    }
    span{
        display: block;
        font-size: 3vw;
    }


    /* 今日必追 */
    .chase{
        width: 100%;
        /* background: #f89b4e;  */
        /* height: 52vw; */
    }
    .willChase{
        width: 100%;
    }
    .willChase span{
        display: inline;
    }
    .willChase span:nth-child(1){
        font-size: 4.5vw;
        font-weight: bold;
        /* margin-left: 2vw; */
    } 
    .willChase span:nth-child(2){
        float: right;
        font-size: 4vw;
        color: #e95e3b;
        margin-top: 0.5vw;
    }
    .afterPlay{
        width: 100%;
        /* background: rosybrown; */
        margin-top: 3vw;
        display: flex;
    }
    .afterPlay div{
        width: 25%;
        position: relative;
        flex: 1
    }
    .afterPlay .afterPlayImg{
        width: 90%;
        position: relative;
        background: #f6f5ec;
        border-radius: 1.5vw;
        margin: 0 1vw;
        /* margin-bottom: 1.5vw; */
    }
    .afterPlayImg img{
        width: 100%;
        height: 25vw;
        border-radius: 1vw;
    }
    .afterPlayImg p{
        width: 100%;
        /* height: 5vw; */
        position: absolute;
        text-align: center;
        line-height: 5.5vw;
        font-size: 2vw;
        color: #fff;
        background: #f89b4e;
        border-bottom-left-radius: 1vw;
        border-bottom-right-radius: 1vw;
        bottom: 0.5vw;
    }
    .afterPlay span{
        display: block;
        width: 90%;
        /* background: seagreen; */
        margin: 0 1vw;
        display: -webkit-box;             /*将对象转为弹性盒模型展示*/
        -webkit-box-orient: vertical;     /*设置弹性盒模型子元素的排列方式*/
        -webkit-line-clamp: 2;            /*限制文本行数*/
        overflow: hidden;                 /*超出隐藏*/
        font-size: 3vw;
        
    }

    .afterPlay span:nth-child(3){
        font-size: 2vw;
        color: #b3b2b2;
    }


    /* 今日热推 */
    .hotPush{
        width: 100%;
        /* height: 123vw; */
        /* background: yellowgreen; */
        margin-top: 7vw;
        margin-bottom: 6vw;
    }
    .hot{
        width: 100%;
        font-size: 4.5vw;
        font-weight: bold;
    }

    .push{
        width: 100%;
        margin-top: 4vw;
    }

    .push div{
        width: 50%;
        display: inline-block;
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

</style>