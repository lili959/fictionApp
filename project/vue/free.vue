<template>
    <div id="free">
        <router-link tag="div" to="/search"  class="search">
            <input type="text" id="nav-ipt" placeholder="text">
        </router-link>
        <div class="nav-head">
            <a href="" @click.prevent="classification='recommended'" class="btn1">推荐</a>
            <a href="" @click.prevent="classification='boy'">男生</a>
            <a href="" @click.prevent="classification='girl'">女生</a>
            <component :is="classification"></component>
        </div>
    </div>
</template>

<script>
import recommended from "./recommended.vue"
import boy from "./boy.vue"
import girl from "./girl.vue"
import $ from 'jquery'

    export default {
        data() {
            return {
                active:'search',
                classification:"recommended",
                list:[]
            }
        },
        components:{
            recommended,
            boy,
            girl
        },
        mounted:function(){
            this.swi();
        },
        methods:{
            swi(){
                // console.log(111);
                $('.nav-head').children('a').on('click',function(){
                    $(this).addClass('btn1').siblings().removeClass('btn1');
                    // console.log(123) 
                    // console.log($(this))
                })
            },
        }
    }
</script>
<style scoped>
    .btn1{
        border-bottom: 2px solid  #000;
    }
    #free{
        width: 100%;
        /* position: absolute; */
        /* background: slategray; */
        margin-top: 12vw;
        margin-bottom: 16vw;
    }
    .search{
    width: 100%;
    /* background: blue; */
    position: fixed;
    padding: 2vw 5vw;
    top: 0;
    /* position: relative; */
    }
    .search input{
        width: 90vw;
        height: 7.5vw;
        border-radius: 10vw;
        outline:none;  
        border:none;
        background: #e4e3e3;
        text-align: center;
        color: #919090;
        font-size: 4vw;
    }
  

    .nav-head{
        width: 100%;   
        /* background: salmon */
    }

    .nav-head a{
        height: 8.5vw;
        font-size: 5vw;
        color: black;
        /* background: blue; */
        margin: 0vw 6vw 2vw;
        text-decoration:none;
        margin-top: 2vw;
        display: inline-block;
    }

    .nav-head a:nth-child(1){
        margin-left: 22vw;
    }
    

</style>