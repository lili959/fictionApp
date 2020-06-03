<template>
<div>
    <div class="search_a">
        <div class="search-ipt">
            <router-link tag="div" to="/recommended" class="back">
                <van-icon name="arrow-left" ></van-icon>
            </router-link>
            <input type="text"  placeholder="text" v-model="Search">

        </div>
        <ul class="search-list">
            <router-link tag="li"  :to="'/details?id='+30" v-for="key in list" :key="key.index">
                {{key.name}} 
                <span>作者：{{key.author}}</span> 
            </router-link>
        </ul>
    </div>
</div>
</template>
<script>
import $ from 'jquery'; 
export default {
    data(){
        return {
            Search:"",
            list:[]
        }
    }, 
    mounted:function(){
        this.search();
    },
    methods:{
        search(){
            var that = this;
            
            $('.search-ipt').on('keyup',function(){
                that.list.splice(0); //清空数组
                var te = that.Search;
                that.$http.get("http://api.pingcc.cn/?xsname=" + te).then(function(result){
                    // console.log(result.body);
                    if(result.body.code == 0){
                        for(var i=0;i<result.body.list.length;i++){
                        //  console.log(result.body.list[i]);
                            that.list.push(result.body.list[i]);  
                        }
                    }
                // console.log(that.list);
                })
                
            });
                
        },
    },
}
</script>
<style scoped>
.back{
    display: inline-block;
    width: 5vw;
    font-size: 5vw;
    line-height: 7vw;
}
 .search-ipt{
    width: 100%;
    /* background: blue; */
    position: fixed;
    padding: 2vw 1vw;
    top: 0;
    /* position: relative; */
    }
.search-ipt input{
    width: 80vw;
    height: 7.5vw;
    border-radius: 10vw;
    outline:none;  
    border:none;
    background: #e4e3e3;
    text-align: center;
    color: #919090;
    font-size: 4vw;
}
.search-list{
    width: 100%;
    height: 85vh;
    /* background: #919090; */
    overflow: scroll;
    margin-top: 40px;
}
.search-list li{
    position: relative;
    width: 100%;
    height: 10vw;
    line-height: 10vw;
    margin-top: 1vw;
    padding-left: 5vw;
}
.search-list li span{
    position: absolute;
    right: 3vw;
    color: #898989;
    font-size: 4vw;

}

</style>