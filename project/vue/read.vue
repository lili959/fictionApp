<template>
  <div class="read">
    <div class="readBox" >
      <!-- <h1>{{data}}</h1> -->
      <div class="top">
        <div class="chapter">
          <p>
            <span class="cata_text">{{body.num}}</span>
            <span class="read_set" @click="setting='set'">设置</span>
          </p>
          <p class="chapter_sty">
            <span>{{time}}</span>
          </p>
        </div>
        <div class="retun">
          <router-link :to="'/catalogue?id='+id">
            <van-icon name="arrow-left" size="15px" color="#333333" />返回
          </router-link>
        </div>
      </div>
      <div class="read_listBox" @click="setting=''">
          <div v-if="previous">
            <van-loading vertical color="#aaaaaa">正在加载上一章...</van-loading>
          </div>
          <div style="text-align:center; color:#aaaaaa; padding: 10px 0px" id="pull_up" @click="click_pre()" v-if="read_index != 0 && !previous"> 
              <p>点击上一章</p>
          </div>
        <ul class="read_list">
          <li v-for="index in body.content">{{index}}</li>
        </ul>
          <div style="text-align:center; color:#aaaaaa;padding: 10px 0px" id="drop_down" @click="click_next()" v-if="read_index != list_length-1 && !nextChapter">
              <p>点击下一章</p>
          </div>
          <div v-if="nextChapter">
            <van-loading vertical color="#aaaaaa">正在加载下一章...</van-loading>
          </div>
      </div>
    </div>
    <transition name="seet"> 
        <component :is="setting" @Font="show"></component>
    </transition>
  </div>
</template>
<script>
import $ from "jquery"
import sett from "./readset.vue"
export default {
  data() {
    return {
      data: "阅读",
      body: {},
      list_length:'',
      catalogue: {},
      read_index:'',
      read_url:'',
      url:'',
      id: "",
      time: "",
      previous:false,
      nextChapter:false,
      setting:false,
    };
  },
  created() {
    // console.log(this.$route);
    this.id = this.$route.query.id;
    this.read_url = this.$route.query.url
    this.getread();
    this.getcatalogue();
    this.getTime();
  },
  methods: {
    getread() {
      var that = this;
      this.$http
        .get("http://api.pingcc.cn/?xsurl2=" + this.read_url)
        .then(function(rsow) {
          // console.log(rsow);
          setTimeout(()=>{
          that.previous = false;
          that.nextChapter = false;
          that.body = rsow.body;
          // $('.read_listBox').scrollTop();
          var read_listBox = document.getElementsByClassName("read_listBox");
          read_listBox[0].scrollTop = 0;
          },500)
        });
    },
    getcatalogue() {
      var that = this;
      this.$http
        .get("http://localhost:8080/bookscata/" + this.id)
        .then(function(rows) {
          // console.log(rows);
          that.url = rows.body[0].url;
          that.getlist();
        });
    },
    getlist() {
      var that = this;
      this.$http.get("http://api.pingcc.cn/?xsurl1=" + this.url).then(function(result) {
          // console.log(result);
          that.catalogue = result.body;
          that.list_length = result.body.list.length;
          for(var i=0;i<result.body.list.length;i++){
            if(result.body.list[i].url == this.$route.query.url){
              // console.log(i);
              that.read_index = i;
              return ;
            }
          }
          // that.path = result.body.data;
          // console.log(result.body);
          // that.getlistSHow();
        });
    },
    click_pre(){
      // console.log(111111);
      this.previous = true;
      this.read_index = this.read_index - 1;
      this.read_url = this.catalogue.list[this.read_index].url;
      this.getread();
    },
    click_next(){
      // console.log(222222);
      this.nextChapter = true;
      this.read_index = this.read_index + 1;
      this.read_url = this.catalogue.list[this.read_index].url;
      this.getread();
    },
    getTime() {
      setInterval(() => {
        this.time =
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ":" +
          new Date().getSeconds();
      }, 10);
    },


    // 获取到字体样式
    show(Data){
      // console.log(Data);
      $(".read_list li").css({
        fontSize:Data.FontSize+'px',
        fontFamily:Data.FontFamily,
      });
    },

  },
  components:{
    'set':sett,
  },

  mounted: function() {
    // var date = new Date;
  },

};
</script>
<style scoped>
.read {
  position: fixed;
  width: 100%;
  height: 100%;
  background: white;
  top: 0;
  /* right: 0; */
  z-index: 3;
}

.readBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:url("../static/images/timg.jpg") no-repeat;
  background-size: 100% 100%;
  /* background: radial-gradient(red 15%,green 20%,gold 16%); */
  /* background: linear-gradient(90deg,rgb(255, 123, 35) 15%,rgb(243, 162, 57),rgb(255, 123, 35) 15%) */
}

.top {
  width: 100%;
  position: relative;
  border-bottom: 1px solid #333333;
  overflow: hidden;
  height: 60px;
}
.top div {
  position: absolute;
}

.retun {
  font-size: 18px;
  padding: 5px 0px 5px 20px;
  /* padding-left: 20px; */
  /* float: left; */
}
.retun a {
  color: #333333;
}

.chapter {
  text-align: center;
  width: 100%;
  font-size: 20px;
  padding: 5px 0px;
  color: #333333;
}
.chapter_sty {
  color: #333333;
  font-size: 13px;
}

.read_listBox {
  width: 100%;
  position: absolute;
  top: 60px;
  bottom: 0;
  /* background: red; */
  overflow: scroll;
}

.read_list {
  width: 100%;
  /* margin-top: -20px; */
  padding: 0px 10px;
}
.read_list li{
  font-family: "华文黑体";
  font-size: 15px;
}

.read_set{
  position: absolute;
  /* float: right; */
  padding: 0px 10px;
  right: 0px;
  font-size: 18px;
}
.cata_text{
  margin: 0 auto;
  display:inline-block;

width:10em;

word-break:keep-all;

white-space:nowrap;

overflow:hidden;

text-overflow:ellipsis;
}

/* 组件过度动画 */
.seet-enter-active{
  animation: seet-an .6s ease;
}
.seet-leave-active{
  animation: seet-an .6s ease reverse;
}
@keyframes seet-an{
  0%{
    bottom: -100%;
    opacity: 0;
  }
  100%{
    bottom: 0;
    opacity: 1;
  }
}

</style>