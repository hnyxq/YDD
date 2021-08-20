<template>
  <div class="search">
    <el-col :span="6">
      <location></location>
      <div class="logbef" v-if="this.$store.state.isLogin == false">
        <!-- 未登录 -->
        <router-link to="/login">登录</router-link>
      </div>
      <div class="user" v-if="this.$store.state.isLogin == true">
        <!-- 登陆后 -->
        <el-avatar
          :src="this.$store.state.userInfo.img"
          class="imgurl"
        ></el-avatar>
        <div class="box">
          <ul>
            <li @click="myHandle">个人主页</li>
            <li @click="outHandle">退出登录</li>
          </ul>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import location from './location.vue';
export default {
  name: "search",
  data() {
    return {
      
    };
  },
  components:{
    location
  },
  methods: {
    // 退出登录
    outHandle() {
      this.$store.commit("logout");
    },
    // 个人主页
    myHandle() {
      this.$store.commit("setActiveIndex", "/myMuisc");
      this.$router.push({ path: "/myMuisc" });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.search{
    width: 100%;
}
.logbef,
.user{
  position: relative;
  width: 40%;
  height: 69px;
  float: left;
  color: rgb(141, 142, 143);
}
.logbef a{
  font-size: 18px;
  line-height: 69px;
}
.imgurl{
  width: 50px;
  height: 50px;
  margin-top: 10px;
  margin-left: 30px;
}
.box{
  width: 150px;
  height: 100px;
  position: absolute;
  top: 60px;
  left: -20px;
  background: rgb(40, 41, 43);
  z-index: 100;
  line-height: 50px;
  display: none;
}
.box li{
  width: 80px;
  height: 50px;
  font-size: 15px;
  margin: 0 auto;
  cursor: pointer;
}
.user:hover .box{
  display: block;
}
</style>