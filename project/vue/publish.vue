<template>
    <div class="center">
        <div class="renewal">
            <span>共<strong>2564</strong>本书，上周更新了<strong>2564</strong>本</span>
        </div>

        <div class="listStyle">
            <div>
               <span>影视榜</span> 
            </div>
            <div>
                <span>畅销榜</span>
            </div>
            <div>
                <span>图书榜</span>
            </div>
            <div>
                <span>文学榜</span>
            </div>
        </div>

        <div class="directory">
            <router-link tag="div" :to="'/classList?id='+key.id" class="directory_a" v-for="key in list" :key="key.index">
                <div class="imgs">
                    <img :src="images1" width="100%" alt="">
                </div>
                <div>
                    <span>{{key.name}}</span>
                    <div class="bookInfo">
                        <span>热血</span>&nbsp; /&nbsp;
                        <span>复仇</span>&nbsp; /&nbsp;
                        <span>重生</span>&nbsp; /&nbsp;
                        <span>废材</span>
                    </div>
                    <span class="glyphicon glyphicon-menu-right rig"></span>
                </div>
            </router-link>          
        </div>

    </div>
</template>
<script>
    export default {
		data() {
			return {
            active: 'publish',
            list:[],    //存储所有数据

            images1:'../../static/images/1.png',
			}
        },
        created:function(){
            this.getboyclass();
        },
        methods:{
            getboyclass(){
                var that = this;
                    this.$http.get("http://localhost:8080/bookType").then(function(result){
                        // console.log(result.body);
                        for(var i=0;i<result.body.length;i++){
                            if(result.body[i].pid ==3){
                                that.list.push(result.body[i]);
                            }
                        }
                        // console.log(that.list);                       
                    })
            },
        }
	};
</script>
<style scoped>
	.center{
        width: 82%;
        height: 87vh;
        position: absolute;
        /* background: sienna; */
        overflow: scroll;
        right: 0;
        top: 12vw;
        padding: 0 5vw;
    }

    .renewal{
        width: 100%;
    }
    .renewal span{
        font-size: 3.5vw;
        line-height: 10vw;
        color: #999999;
    }

    .renewal strong{
        font-weight: normal;
    }



    .listStyle{
        width: 100%;
        /* background: seagreen; */
    }
    .listStyle div{
        width: 32vw;
        height: 14vw;
        background: #FFA500;
        margin: 1.5vw 0;
        margin-right: 3vw;
        border-radius: 1vw;
        display: inline-block;
        text-align: center
    }
    .listStyle span{
        line-height: 13.5vw;
        font-size: 4vw;
        color: #fff;
    }


    .directory{
        width: 100%;
        margin-top: 6.5vw;
    }

    .directory_a{
        width: 100%;
        height: 16vw;
        position: relative;
        margin: 2vw 0;
        /* background: olivedrab; */
    }
    .imgs img{
        width: 13vw;
        height: 13vw;
        position: absolute;
        background: #EFEFEF;
        border-radius: 50%;
        bottom: 2.5vw;
    }
    .directory_a span{
        line-height: 7vw;
        margin-left: 17vw;
        font-size: 4vw;
    }
    .bookInfo{
        margin-left: 17vw;
        font-size: 3vw;
        color: #999999;
    }
    .bookInfo span{
        font-size: 3vw;
        color: #999999;
        display: inline-block;
        margin: 0;
    }
    .rig{
        position: absolute;
        right: 0;
        font-size: 5vw;
        color: #999999;
        top: 3vw;
    }
</style>