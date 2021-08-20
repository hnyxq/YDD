<template>
  <div class="top">
    <el-row>
      <!-- logo -->
      <el-col :span="3" :offset="4">
        <div class="logo">
          <router-link to="/home">网易云</router-link>
        </div>
      </el-col>
      <!-- 导航 -->
      <el-col :span="7">
        <el-menu
          :default-active="this.$store.state.activeIndex"
          mode="horizontal"
          @select="this.$store.dispatch('setActiveIndex', index)"
          background-color="#2c323b"
          text-color="seashell"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/home">发现音乐</el-menu-item>
          <el-menu-item index="/myMuisc">我的音乐</el-menu-item>
          <el-menu-item index="/singer?area=-1&type=-1&initial=-1">歌手</el-menu-item>
          <el-menu-item index="/songList">歌单</el-menu-item>
          <el-menu-item index="/rank">排行</el-menu-item>
        </el-menu>
      </el-col>
      <!-- 搜索登录 -->
      <search></search>
    </el-row>
  </div>
</template>

<script>
import search from './home/search/search.vue'
export default {
  components: { search },
  name: "top",
  components:{
    search
  },
  data(){
    return{
    }
  },
  methods: {
    
  }
};
</script>

<style>
.top {
  width: 100%;
  height: 70px;
  background: #2c323b;
  
}
.logo {
  width: 176px;
  background: url("../assets/img/logo.png") no-repeat;
}
.logo a {
  display: block;
  height: 69px;
  width: 157px;
  font-size: 0;
}
.el-menu {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.el-menu-item {
  height: 69px;
  line-height: 69px;
  font-size: 15px;
}
.el-menu.el-menu--horizontal {
  border: none;
}

</style>