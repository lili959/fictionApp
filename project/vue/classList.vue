<template>
  <div id="classList">
    <div class="logo-wrap">
      <router-link to="/pay" class="search-back">
        <van-icon name="arrow-left" class="icom-left" />
      </router-link>分类
      <router-link to="pay" class="search-bookshelf">书架</router-link>
      <van-icon name="search" class="icom-search"/>
    </div>

    <div class="down">
      <ul id="nav-list">
        <li class="btn">人气最高</li>
        <li>最畅销</li>
        <li>筛选</li>
      </ul>

    </div>
    <!-- 列表 -->
    <div class="column">
        <div>
          <ul class="books-list">
            <router-link :to="'/details?id='+key.id" tag="li" v-for="key in list1" :key="key.index"  :data-id="key.id" >
              <div class="bookImg">
                <img :src="key.picture" @error="imgErr($event)"/>
              </div>
              <div class="book-detail">
                <p class="book-title">{{key.booksname}}</p>
                <p class="book-summary">{{key.descr}}</p>
                <div class="book-info">
                  <span>{{key.author}}</span>/
                  <span v-if="key.state = '1'">连载中</span>
                  <span v-else>完本</span>/
                  <span>{{key.typename}}</span>
                </div>
              </div>
            </router-link>
          </ul>
            <van-icon name="upgrade" class="toTop"/>
        </div>
      </div>
  </div>
</template>
<script>
import $ from 'jquery';

export default {
  data() {
    return {
      list:[],    //存储所有数据
        list1:[],   //遍历到页面的数据
        page:2, 
    };
  },
  created: function() {
    var pid =  this.$route.query.id;  //接收传过来的id
    this.getBooks(pid);     //请求数据库
    // console.log(pid);
    this.loadBooks();    //动态加载书籍到数组中
    
  },
  mounted:function(){

    $('.down ul li').off('click').on('click',function(){
        $(this).addClass('btn').siblings().removeClass('btn');
        
    })

    // 返回顶部按钮
    $('.toTop').on('click',function(){
        $("html,body").animate({ scrollTop: 0 }, 500);
        // console.log(111);
        
    });
  },
  methods: {
    getBooks(pid) {
      var that = this;
    //   console.log(pid);
      // 使用此方法需要下载vue-resource组件，否则无法使用get方法
      that.$http.get("http://localhost:8080/getBooks?id="+pid).then(function(arr) {
        // 将所有数据存入数组
        // console.log(arr.body);   
       
        for(var i=0;i<arr.body.length;i++){
            if(arr.body[i].tid  == pid){
                that.list.push(arr.body[i]);
            }
        }
        // console.log(that.list);
        
        that.initBooks();
      });
    },
    // 初始化页面  给页面添加10条数据,给头部选项绑定点击事件
    initBooks(){
        var that = this;
        for( var i=0; i< 10;i++){
            that.list1.push(that.list[i]);
        }
        $('#nav-list').children().on('click',function(){
          // console.log($(this).index());
          if( $(this).index() == 0){
            // console.log(111);
            that.list1.splice(0);
            for( var i=0; i< 10;i++){
              that.list1.push(that.list[i]);
            }
          }else if( $(this).index() == 1){;
              that.list1.reverse(); //将数组颠倒顺序
          } else{
            // console.log('未做');
            
          }
          
        })
    },
    loadBooks(){
        var that = this;
        window.onscroll = function(){
            var scrTop = that.getScrollTop(); //滚动条高度
            var winHeight = $(document).height(); //窗口高度
            var num = winHeight - scrTop;   //滚动条距离底部的距离
            // console.log(winHeight);

            if(num < 800){
                 for( var i= 10*(that.page-1) ; i< 10*that.page;i++){
                    that.list1.push(that.list[i]);
                    // console.log(i);
                }
                that.page +=1;
            }
            
            //返回顶部按钮的隐藏与显示
            if( scrTop > 300){
                $('.toTop').css('display','block');
            }else{
                $('.toTop').css('display','none');
            }
        }
    },
    // 图片加载错误
    imgErr(e){
        // console.log(e.path[0]);
        $(e.path[0]).attr('src','static/images/default.jpg')
        
    },  

    // 获取滚动条高度
    getScrollTop() {
        var scroll_top = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scroll_top = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scroll_top = document.body.scrollTop;
        }
        return scroll_top;
    },
  },
}
</script>
<style scoped>
a{
    text-decoration: none;
    color: black;
}
p {
  padding: 0;
  margin: 0;
}
#classList {
  width: 100vw;
  height: 100vh;
  /* background: red; */
  position: absolute;
  z-index: 9;
  /* background-color: #ee5048; */
  color: #fff;
  /* overflow: scroll; */
}

.down ul .btn{
    color: #ff463c;
}
/* 头部框start */
.logo-wrap {
  text-align: center;
  font-size: 18px;
  position: relative;
  height: 44px;
  line-height: 44px;
  background: sandybrown;   
}
.search-back {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 35px;
}
.icom-left {
  color: #fff;
  font-size: 20px;
}
.search-bookshelf {
  font-size: 17px;
  right: 58px;
  color: #fff;
  position: absolute;
}
.icom-search {
  position: absolute;
  right: 8px;
  top: 10px;
  color: #fff;
  font-size: 24px;
}
.nav-search{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  z-index: 10;
}
.ipt{

}
.close{

}
/* 头部框end */
.down {
  width: 100%;
  text-align: center;
}
.down ul li {
  position: relative;
  display: inline-block;
  /* background: seagreen; */
  width: 30%;
  line-height: 8vw;
  font-size: 4vw;
  color: black;
   overflow: hidden;
}


/* 列表 */
.column {
  padding: 0 20px;
  background-color: #fff;
}
.books-list{
  /* height: 76vh; */
  overflow: hidden;
  position: relative;
    color: black;
}
.books-list li {
  overflow: hidden;
  display: flex;  
  margin-top: 20px;
  /* box-shadow: 0 0 1px #89898989; */
  border-radius: 3px;
  
}

.books-list .bookImg {
  width: 74px;
  height: 99px;
  margin-right: 13px;
  box-shadow: 0 1px 6px 0 rgba(169, 169, 169, 0.2);
}
.books-list .bookImg img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: left top;
}
.book-detail {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-width: 0;
  padding: 5px;
  position: relative;
}
.book-title {
  line-height: 27px;
  font-size: 17px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  white-space: nowrap;
  display: block;
  margin-bottom: 5px;
}
.book-summary {
  line-height: 24px;
  font-size: 12px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
}
.book-info {
  /* margin-bottom: -5px; */
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  white-space: nowrap;
  display: block;
  font-size: 12px;
  line-height: 22px;
  color: #999;
  /* position: absolute; */
  bottom: 10px;
}
.toTop{
    width: 44px;
    height: 44px;
    position: fixed;
    bottom: 50px;
    right: 20px;
    color: #666;
    background-color: rgba(243,243,243,0.93);
    font-size: 44px;
    z-index: 9;
    display: none;
    box-shadow: 0 0 3px rgba(4,0,0,0.19);
    border-radius: 50%;
}
</style>