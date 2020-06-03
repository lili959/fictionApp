<template>
  <div class="setbox">
    <!-- <p class="FontSize">字体大小</p> -->
    <div class="FontSize">
        <p>字号<van-button type="default" @click="FontSize ++">A+</van-button><van-button type="default" @click="FontSize --">A -</van-button></p>
    </div>
    <div class="FontFamily">
        <p>字体样式</p>
        <ul class="FamilyList">
            <li ><p @click="FontFamily='华文楷体'" >华文楷体</p></li>
            <li><p @click="FontFamily='华文宋体'">华文宋体</p></li>
            <li><p @click="FontFamily='华文仿宋'">华文仿宋</p></li>
            <li class="active"><p @click="FontFamily='华文黑体'">华文黑体</p></li>
        </ul>
    </div>
    
  </div>
</template>
<script>
import $ from "jquery"
export default {
    data(){
        return {
            FontSize:15,
            FontFamily:"华文黑体",
        }
    },
    watch:{
        "FontSize":function(){
            // console.log("ssss");
            this.$emit("Font",{
                FontFamily:this.FontFamily,
                FontSize:this.FontSize,
            });
        },
        "FontFamily":function(){
            // var that = this;
            // console.log("ssss");
            this.$emit("Font",{
                FontFamily:this.FontFamily,
                FontSize:this.FontSize,
            });
            for(var i=0;i<$(".FamilyList li").length;i++){
                if($(".FamilyList li").eq(i).text() == this.FontFamily){
                    $(".FamilyList li").eq(i).addClass("active").siblings().removeClass("active");
                }
            }
        },
    },
    methods:{
    },
};
</script>
<style scoped>
.setbox {
  width: 100%;
  height: 30%;
  background: rgba(0, 0, 0, 0.87);
  position: absolute;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /* top: 0; */
  bottom: 0;
  padding: 10px;
}

.FontSize{
    width: 100%;
    color: #aaaaaa;
    margin: 10px 0px;
}

.FontSize button{
    /* color: white; */
    height: 35px;
    line-height: 35px;
    padding: 0px 30px;
    margin: 0px 10px;
    /* border-color:rgba(0, 0, 0, 0.568); */
    font-size: 17px;
    background: rgba(255, 255, 255, 0.712);
    /* background: #aaaaaa42; */
    /* border: none; */
}
.FontFamily{
    width: 100%;
}
.FontFamily p{
    width: 100%;
    color: #aaaaaa;

}

.FamilyList{
    width: 100%;
    overflow: hidden;
}
.FamilyList li{
    padding: 10px 20px;
    text-align: center;
    width: 50%;
    float: left;
}
.FamilyList li p{
    width: 100%;
    background: rgba(255, 255, 255, 0.5);
    padding: 5px;
    color: white;
    border-radius: 5px;
    
}

.FamilyList .active p{
    /* border: 1px solid white; */
    background: rgb(255, 255, 255);
    color: black;
}


</style>