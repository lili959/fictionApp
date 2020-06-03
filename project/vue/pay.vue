<template>
    <div class="bookPay">
      <!-- 搜索框 -->
      <div class="nav-header">
        <b>书城·付费</b>
        <span class="search-btn">
          <img src="static/images/icon_search.png" alt />
        </span>
      </div>
      <!-- 导航条 -->
      <nav class="nav-icon">
        <ul class="nav-ul">
          <li>
            <router-link to="/classify">
              <img src="static/images/nav_fl.png" />分类
            </router-link>
          </li>
          <li>
            <a>
              <img src="static/images/nav_mf.png" />付费
            </a>
          </li>
          <li>
            <a>
              <img src="static/images/nav_ph.png" />排行
            </a>
          </li>
          <li>
            <a>
              <img src="static/images/nav_zk.png" />折扣
            </a>
          </li>
          <li>
            <a>
              <img src="static/images/nav_zt.png" />专题
            </a>
          </li>
        </ul>
      </nav>
      <!-- 好评佳作 -->
      <div class="column">
        <div class="column-title-wrap">
          <h4 class="column-title3">好评佳作</h4>
          <a class="more" @click="swit()">换一换</a>
        </div>
        <div>
          <ul class="hpjz-list">
            <router-link
              tag="li"
              v-for="key in list1"
              :key="key.index"
              :to="'/details?id='+key.id"
            >
              <a>
                <img :src="key.picture" @error="imgErr($event)" />
                <p>{{key.booksname}}</p>
                <span>{{key.author}}</span>
              </a>
            </router-link>
          </ul>
        </div>
      </div>
      <!-- 书友推荐 -->
      <div class="column">
        <div class="column-title-wrap">
          <h4 class="column-title3">书友推荐</h4>
          <!-- <a class="more">换一换</a> -->
        </div>
        <div>
          <ul class="sytj-list">
            <router-link
              tag="li"
              v-for="key in list2"
              :key="key.index"
              :to="'/details?id='+key.id"
            >
              <div class="bookImg">
                <img :src="key.picture" />
              </div>
              <div class="book-detail">
                <p class="book-title">{{key.booksname}}</p>
                <div class="book-info">
                  <span>{{key.author}}</span>/
                  <span v-if="key.state = '1'">连载中</span>
                  <span v-else>完本</span>/
                  <span>{{key.typename}}</span>
                </div>
                <p class="book-summary">{{key.descr}}</p>
              </div>
            </router-link>
          </ul>
        </div>
      </div>
      <!-- 我愿称之为最强 最强玄幻小说 -->
      <div class="column">
        <div class="column-title-wrap">
          <h4 class="column-title3">最强玄幻小说</h4>
          <!-- <a class="more">换一换</a> -->
        </div>
        <div>
          <ul class="zqxh-list">
            <router-link
              tag="li"
              v-for="key in list3"
              :key="key.index"
              :to="'/details?id='+key.id"
            >
              <div class="bookImg">
                <img :src="key.picture" @error="imgErr($event)" />
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
            <p class="more more-wrap" @click="more()">查看更多</p>
          </ul>
        </div>
      </div>
      <!-- 限免专区 -->
      <div class="column">
        <div class="column-title-wrap">
          <h4 class="column-title3">
            限免专区
            <van-count-down :time="time">
              <template v-slot="timeData">
                <span class="item">{{ timeData.hours }}</span>:
                <span class="item">{{ timeData.minutes }}</span>:
                <span class="item">{{ timeData.seconds }}</span>
              </template>
            </van-count-down>
          </h4>
          <a class="more">查看更多</a>
        </div>
        <div>
          <ul class="xmzq-list">
            <router-link
              tag="li"
              v-for="key in list1"
              :key="key.index"
              :to="'/details?id='+key.id"
            >
              <a>
                <img :src="key.picture" @error="imgErr($event)" />
                <p class="pic_booksname">{{key.booksname}}</p>
                <span>免费</span>
                <s>5搜豆/千字</s>
              </a>
            </router-link>
          </ul>
        </div>
      </div>
    </div>

</template>

<script>
import $ from "jquery";
$(function() {
  // 安装vant组件 用于倒计时
  //  npm i vant -S  npm i babel-plugin-import -D
});

export default {
  data() {
    return {
      show: true,
      time: 4 * 60 * 60 * 1000,
      list: [], //用于存储书籍数据
      list1: [], //好评佳作
      list2: [], //书友推荐
      list3: [], //最强玄幻
      list4: [], //限免专区
      swi: 4, //点击换一换
      cli: false, //点击查看更多
      id: 4
    };
  },
  created: function() {
    this.getbook();
  },
  methods: {
    getbook() {
      var that = this;
      // 使用此方法需要下载vue-resource组件，否则无法使用get方法
      that.$http.get("http://localhost:8080/getBooks").then(function(arr) {
        // 将所有数据存入数组
        // console.log(arr.body.length);
        for (var i = 0; i < arr.body.length; i++) {
          that.list.push(arr.body[i]);
        }
        // console.log(that.list);

        that.bookBlock();
      });
    },
    // 数据分块
    bookBlock() {
      var that = this;
      // console.log(that.list[1]);

      for (var i = 60; i < 64; i++) {
        that.list1.push(that.list[i]);
      }
      for (var i = 5; i < 10; i++) {
        // console.log(arr.body[i]);
        that.list2.push(that.list[i]);
      }
      for (var i = 10; i < 20; i++) {
        // console.log(arr.body[i]);
        that.list3.push(that.list[i]);
      }
      for (var i = 20; i < 24; i++) {
        // console.log(arr.body[i]);
        that.list4.push(that.list[i]);
      }
    },
    // 点击换一换
    swit() {
      var that = this;
      var sum = that.swi;
      that.list1.splice(0);
      for (var i = sum; i < sum + 4; i++) {
        that.list1.push(that.list[i]);
      }
      this.swi += 4;
      // console.log(that.list1);
      
    },
    // 图片加载错误
    imgErr(e) { 
      // console.log(e.path[0]);
      $(e.path[0]).attr("src", "static/images/default.jpg");
    },

    // 点击查看更多
    more() {
      if (!this.cli) {
        // console.log(11);
        $(".zqxh-list").animate({ height: "100%" });
        $(".more-wrap").html("收起");
        this.cli = true;
      } else {
        $(".zqxh-list").animate({ height: "76vh" });
        $(".more-wrap").html("查看更多");
        // console.log(2);
        this.cli = false;
      }
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: black;
}
p {
  padding: 0;
  margin: 0;
}
span {
  color: #898989;
  font-size: 12px;
}

.bookPay {
    width: 100%;
    height: -webkit-fill-available;
    overflow: scroll;
}
/* 头部搜索框 */
.nav-header {
  display: flex;
  width: 100%;
  height: 30px;
  overflow: hidden;
  padding-top: 1vw;
}
.nav-header b {
  margin-left: 40%;
  font-size: 18px;
}
.search-btn {
  overflow: hidden;
  width: 25px;
  height: 25px;
  right: 30px;
  position: absolute;
}
.search-btn img {
  width: 100%;
}

/* 小说类别 */
nav {
  display: block;
}
.nav-icon ul {
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
.nav-icon li {
  position: relative;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  -ms-flex: none;
  flex: none;
  width: 8.5%;
  text-align: center;
  color: #444;
  font-size: 12px;
  line-height: 13px;
  white-space: nowrap;
}
.nav-icon a {
  display: block;
}
.nav-icon img {
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 5px;
}

/* 通用模块 */
.column {
  padding: 0 20px;
  margin-top: 20px;
}
.column-title-wrap {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.column-title3 {
  /* padding: 15px 0; */
  line-height: 45px;
  font-weight: bold;
  font-size: 18px;
  /* color: #222; */
}
.more {
  display: block;
  text-align: center;
  font-size: 15px;
  color: #ff6e4d;
}
.book-info span {
  margin: 0 5px 0;
}
/* 好评佳作 */
.column .column-title-wrap .column-title3 {
  flex: 1;
}
.column .column-title-wrap .more {
  -webkit-box-flex: 0;
  -webkit-flex: none;
  -ms-flex: none;
  flex: none;
}
.hpjz-wrap {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.hpjz-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-bottom: 10px;
}
.hpjz-list li {
  flex-shrink: 1;
  width: 22vw;
  margin-right: 3.8806%;
  font-size: 14px;
}
.hpjz-list a {
  display: block;
  text-align: center;
}
.hpjz-list img {
  border-radius: 5px;
  width: 77px;
  height: auto;
  display: block;
  margin-bottom: 5px;
}

/* 书友推荐 */
.sytj-list li {
  overflow: hidden;
  display: flex;
  margin-bottom: 25px;
  box-shadow: 0 0 1px #89898989;
  border-radius: 3px;
}
.bookImg {
  position: relative;
  z-index: 0;
  -webkit-box-shadow: 0 1px 6px 0 rgba(169, 169, 169, 0.2);
  box-shadow: 0 1px 6px 0 rgba(169, 169, 169, 0.2);
  border-radius: 3px;
  overflow: hidden;
}
.sytj-list .bookImg {
  width: 74px;
  height: 99px;
  margin-right: 13px;
  box-shadow: 0 1px 6px 0 rgba(169, 169, 169, 0.2);
}
.sytj-list .bookImg img {
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
  -webkit-line-clamp: 1;
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
.pic_booksname{
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  white-space: nowrap;
}
/* 最强玄幻小说 */
.zqxh-list {
  height: 76vh;
  overflow: hidden;
  position: relative;
}
.zqxh-list li {
  overflow: hidden;
  display: flex;
  margin-bottom: 25px;
  /* box-shadow: 0 0 1px #89898989; */
  border-radius: 3px;
}

.zqxh-list .bookImg {
  width: 74px;
  height: 99px;
  margin-right: 13px;
  box-shadow: 0 1px 6px 0 rgba(169, 169, 169, 0.2);
}
.zqxh-list .bookImg img {
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: left top;
}
.more-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  /* z-index: 4; */
}

/* 限免专区 */
/* 倒计时 */
.van-count-down,
.van-divider {
  color: #323233;
  font-size: 14px;
  line-height: 20px;
  display: inline-block;
}
.item {
  display: inline-block;
  width: 22px;
  border-radius: 2px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: black;
}
.xmzq-wrap {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}
.xmzq-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-bottom: 10px;
}
.xmzq-list li {
  width: 22.08955%;
  margin-right: 3.8806%;
  font-size: 14px;
}
.xmzq-list a {
  display: block;
  text-align: center;
}
.xmzq-list img {
  border-radius: 5px;
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 5px;
}
.xmzq-list span {
  color: #ff6e4d;
  font-size: 12px;
}
.xmzq-list s {
  display: block;
  font-size: 12px;
  color: #898989;
}
</style>