<template>
  <div class="catalogue">
    <div class="catalogueBox">
      <div class="top">
        <div class="chapter">
          <p>
            <span>{{path.name}}</span>
          </p>
          <p class="chapter_sty">
            <span>{{path.tag}}</span>
          </p>
        </div>
        <div class="retun">
          <router-link to="/home">
            <van-icon name="arrow-left" size="15px" color="#aaaaaa" />返回
          </router-link>
        </div>
      </div>
     <div class="cata_listBox" @scroll="getscroll()">
         <ul class="cata_list" >
             <li v-for="index in list_show"><router-link :to="'/read?url='+index.url+'&id='+id">{{index.num}}</router-link></li>
         </ul>
     </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery"
export default {
  data() {
    return {
      id: "",
      list: [],
      path: {},
      list_show:[],
      num:20,
      url:''
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getCata();
    // console.log(this.$route);
  },
  methods: {
    // 获取书名的url
    getCata() {
      var that = this;
      // console.log(this.id);
      this.$http.get("http://localhost:8080/bookscata/" + this.id).then(function(result) {
          // console.log(result);
          that.url = result.body[0].url;
          that.getlist();
        });
    },
    // 获取章节
    getlist() {
      var that = this;
      this.$http.get("http://api.pingcc.cn/?xsurl1=" + this.url).then(function(result) {
          // console.log(result);
          that.list = result.body.list;
          that.path = result.body.data;
          // console.log(result.body);
            that.getlistSHow();
        });
    },
    // 获取章节的内容
    getlistSHow(){
        for(var i=0;i<this.num;i++){
            if(i<this.list.length){
                this.list_show.push(this.list.shift());
            }else{
                return;
            }
        }
    },
    getscroll(){
        var offset =$(".cata_list").height()-$(".cata_listBox").height(); 
        if((offset-10) < $(".cata_listBox").scrollTop()){
            this.getlistSHow();
            // console.log(111);
        }
    }
  },
  mounte:function(){}
};
</script>
<style scoped>
.catalogue {
  position: fixed;
  width: 100%;
  height: 100%;
  background: white;
  top: 0;
  /* right: 0; */
  z-index: 3;
}

.catalogueBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.top {
  width: 100%;
  position: relative;
  border-bottom: 1px solid #aaaaaa;
  overflow: hidden;
  height: 50px;
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
  color: #aaaaaa;
}

.chapter {
  text-align: center;
  width: 100%;
  font-size: 20px;
  padding: 5px 0px;
}
.chapter_sty {
  color: #aaaaaa;
  font-size: 13px;
}

.cata_listBox{
    width: 100%;
    position: absolute;
    top: 50px;
    bottom: 0;
    /* background: red; */
    overflow: scroll;

}

.cata_list{
    width: 100%;
    }
.cata_list li{
    width: 100%;
    padding: 10px 20px;
    border-bottom: 1px solid #cccccc;
}

.cata_list li a{
  color: black;
}


</style>