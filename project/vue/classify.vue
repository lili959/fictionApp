<template>
    <div id="classify">
        <div class="head">
            <router-link to="/recommended" tag="b"><van-icon name="arrow-left" class="back"></van-icon ></router-link>
            <span>分类</span>
            <span>书城</span>
        </div>
   
        <div class="sidebar">
            <a href="" @click.prevent="center='male'" class="btn2">男生</a>
            <a href="" @click.prevent="center='female'">女生</a>
            <a href="" @click.prevent="center='publish'">出版</a>
            
            <components :is="center"></components>
        </div>
    </div>
</template>
<script>
    import male from "./male.vue"
    import female from "./female.vue"
    import publish from "./publish.vue"
    import $ from 'jquery'
    export default {
		data() {
			return {
            active: 'friends',
            center:'male'
			}
        },
        components:{
            male,
            female,
            publish
        },
        mounted:function(){
            this.swi();
        },
        methods:{
            swi(){
                 $('.sidebar').children('a').on('click',function(){
                    $(this).addClass('btn2').siblings().removeClass('btn2');
                    // console.log($(this));
                    
                })
            }
        }
	};
</script>
<style  scoped>
    #classify{
        width: 100%;
        background: rgba(255, 255, 255, 0.973);
    }
    .head{
        width: 100%;
        height: 12vw;
        background: #ffffff;  
    }
    .head .back{
        font-size: 20px;
    }
    .head span{
        display: inline-block;
        font-size: 5vw;
        margin: 0 4vw;
    }
    .head span:nth-child(1){
        font-size: 6vw;
        top: 2vw;
        display: inline;
    }
    .head span:nth-child(2){
        margin-left: 44vw;
        margin-top: 2.5vw;
    }
    .head span:nth-child(3){
        float: right;
        font-size: 4.5vw;
        margin-top: 3.8vw;
    }
    .head b{
        margin-left: 3vw;
        position: absolute;
        top: 3vw;
        font-size: 6vw;
    }

    .sidebar{
        width: 18%;
        height: 87vh;
        /* position: relative; */
        background: #fafafa;    
    }
    .sidebar a{
        width: 100%;
        height: 18vw;
        font-size: 4vw;
        border-bottom: 0.2vw solid #fff;
        line-height: 18vw;
        list-style: none;
        display: block;
        color: #000;
        text-decoration: none;
        text-align: center;
    }
    .sidebar .btn2{
        border-left: 0.7vw solid #ee5048;
        color: #ee5048;
    }
</style>