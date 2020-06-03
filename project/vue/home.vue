<template>
  <div class="homebox" @scroll="handleScroll($event)" id="homebox">
    <div>
      <!-- 头部 -->
      <div class="top">
        <h3>搜狗阅读</h3>
        <p>
          <van-icon name="search" size="20px" color="#cccccc" />
          <van-icon name="plus" size="20px" color="#cccccc" />
        </p>
      </div>

      <!-- 主体部分 -->
      <div class="main">
        <!-- 第一部分 -->
        <div class="one">
          <h3>新的一周开始了！</h3>
          <div class="sign">
            <span>签到</span>
          </div>
        </div>
        <!-- 第二部分 -->
        <div class="tow">
            <ul class="book_list">
              <li v-for="(key,index) in books" >
                <router-link :to="url+key.bookid" class="read_book" :data ="key.url">
                  <div class="book_img">
                    <img v-bind:src="key.bookimg" width="100%" @error="err($event)" />
                    <span>免费</span>
                  </div>
                  <div class="book_text">
                    <h3 class="book_title">{{key.name}}</h3>
                    <p class="book_author">{{key.author}}</p>
                    <p class="book_read" v-if="key.bookstate == 0">未读</p>
                    <p class="book_read" v-else>已读</p>
                  </div>
                </router-link>
              </li>
            </ul>
        </div>
      </div>
    </div>
    <transition name="catalogue">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      books: [],
      url:"/catalogue?id=",
    };
  },
  created: function() {
    this.bookshelt();

  },
  methods: {
    bookshelt() {
      var that = this;
      this.$http.get("http://localhost:8080/bookshelf").then(function(retur) {
        // console.log(retur);
        that.books = retur.body;
      });
    },
    err(e) {
      e.target.src = "static/images/default.jpg";
    },
    handleScroll(e) {
      var scroll_top = $(".homebox").scrollTop() / 200;
      $(".top").css({
        background: "rgba(255,255,255," + scroll_top + ")"
      });
      if (scroll_top == 0) {
        $(".top h3").css("color", "white");
      } else {
        $(".top h3").css("color", "black");
      }
    }
  },
  mounted() {}
};

// $(function() {
//   $.ajax({
//     type:"get",
//     url:"http://api.pingcc.cn/?xsname=%E8%83%B8",
//     data:"json",
//     success:function(json){
//       var post={};
//       post.json = json;
//       $.post("http://localhost:8080/home",post,function(res){
//         console.log(res);
//       });
//     }
//   })

// });
</script>
<style scoped>
.homebox {
  position: fixed;
  top: 0;
  bottom: 50px;
  overflow: scroll;
}

.top {
  width: 100%;
  height: 46px;
  overflow: hidden;
  /* padding: 5px; */
  position: fixed;
  top: 0;
  z-index: 2;
  /* background: white; */
  /* padding: 10px */
}
.top h3 {
  float: left;
  font-weight: 100;
  font-size: 17px;
  font-family: "楷体";
  color: white;
  padding: 10px;
}
.top p {
  float: right;
  padding: 10px;
}

.top p i {
  margin: 0px 5px;
}

.main {
  width: 100%;
  overflow: hidden;
}

.one {
  width: 100%;
  /* background: red; */
  text-align: center;
  padding-top: 55px;
  padding-bottom: 20px;
  background: url("../static/images/0.jpg") no-repeat;
  background-size: 100% 100%;
  color: white;
}

.one h3 {
  font-family: "楷体";
  font-size: 20px;
  font-weight: 100;
  padding: 15px 0px;
}
.sign span {
  padding: 5px 12px;
  background: linear-gradient(140deg, white, rgb(0, 110, 255));
  border-radius: 20px;
}
.tow {
  width: 100%;
}
.book_list {
  width: 100%;
}
.book_list li {
  width: 100%;
}

.read_book {
  width: 100%;
  display: block;
  overflow: hidden;
  color: black;
}

.book_img {
  width: 25%;
  padding: 2vw 20px;
  float: left;
  position: relative;
  /* border-radius: 8px; */
  /* overflow: hidden; */
  /* border: 1px solid black */
}
.book_img img {
  border-radius: 4px;
  /* position: relative; */
}
.book_img span {
  position: absolute;
  border-radius: 4px;
  background: #cccccc;
  /* float: left; */
  font-size: 5px;
  padding: 2px 5px;
  left: 20px;
}
.book_text {
  width: 75%;
  float: left;
  padding: 2vw 0px;
}
.book_text h3 {
  font-size: 4vw;
  font-weight: 100;
  padding: 1.5vw 0px;
  /* font-family: "宋体" */
}

.book_author,
.book_read {
  padding: 1.5vw 0px;
  font-size: 2vw;
  color: #aaaaaa;
}

.bookshelf-enter{
  transform: scale(0,0);
  opacity: 0;
}
.bookshelf-enter-active{
  transition: 1s;  
}
.bookshelf-enter-to{
  transform: scale(1,);
  opacity: 1; 
}



.catalogue-enter {
  opacity: 0;
  left: 100%;
}
.catalogue-enter-active {
  transition: all .6s;
}
.catalogue-enter-to {
  opacity: 1;
  left: 0;
}
.catalogue-leave {
  opacity: 1;
  left: 0;
}
.catalogue-leave-active {
  transition: all .6s;
}
.catalogue-leave-to {
  opacity: 0;
  left: 100%;
}
</style>