<template>
  <div>
    <div class="box">
      <transition name="app_ane">
      <router-view></router-view>
      </transition>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o" to="/home">书架</van-tabbar-item>
      <!-- <van-tabbar-item name="search" icon="search" to="/search">书城·免费</van-tabbar-item> -->
      <van-tabbar-item name="free" icon="newspaper-o"  to="/free" >书城·免费</van-tabbar-item>
      <van-tabbar-item name="pay" icon="diamond-o" to="/pay">书城·付费</van-tabbar-item>
      <van-tabbar-item name="myter" icon="manager-o" to="/myter">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "home"
    };
  }
};
</script>
<style scoped>
.app_ane-enter-active{
  animation: enter-an .6s ;
}
.app_ane-leave-active{
  animation: leave-an .6s;
}
@keyframes enter-an {
  0%{
    left: 100%;
    opacity: 0;
  }
  100%{
    left: 0;
    opacity: 1;
  }

}
@keyframes leave-an {
  0%{
    left: 0;
    opacity: 1;
  }
  100%{
    left: -100%;
    opacity: 0;
  }

}

</style>