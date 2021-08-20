<template>
  <div class="hot">
    <el-row class="title">
      <el-col :span="8" :offset="4" ><span > 精品</span>歌单</el-col>
      <el-col :span="8" class="hr"><span @click="songListHandle"> 更多</span></el-col>
    </el-row>
    <!-- 遍历歌单 -->
    <el-row>
    <el-col :span="16" :offset="4">
        <div class="hotList">
            <ul>
              <!-- 第一个 -->
                <li class="first">
                    <img :src="hotList[0].coverImgUrl" alt="" @click="hotHandle(item)">
                    <span class="sp">{{hotList[0].name}}</span>
                </li>
                <li v-for="(item,index) in hotList.slice(1)"  :key="index">
                   <img :src="item.coverImgUrl" alt="" @click="hotHandle(item)">
                   <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
    </el-col>
</el-row>
  </div>
</template>

<script>
export default {
  name: "hot",
  data() {
    return {
      hotList: [],
    };
  },
  methods: {
    // 歌单跳转
      hotHandle(item){
          if(item == null){
               window.open(this.$router.resolve({ path:'/gdDetail',query:{ id : this.hotList[0].id }}).href,'_blank')
          }
           window.open(this.$router.resolve({ path:'/gdDetail',query:{ id : item.id }}).href,'_blank')
      },
      songListHandle(){
          this.$store.state.activeIndex = '/songList'
          this.$router.push({path:'/songList'})
      }
  },
  mounted() {
    // 获取精品歌单
    this.$api
      .getHotList({
        before: 1503639064232,
        limit: 9,
      })
      .then((res) => {
        // console.log(res.data.playlists);
        this.hotList = res.data.playlists;
      });
  },
};
</script>
<style scoped>
.hot{
    margin-top: 30px;
}
.title{
    font-size: 25px;
    font-weight: 100;
    height: 25px;
    color: #555;
}
.title span{
    color: rgb(54, 188, 241);
}
.hr{
    font-size: 15px;
    text-align: right;
    cursor: pointer;
}
.hr:hover{
     color: rgb(54, 188, 241);
}
/* 歌单列表 */
.hotList{
    width: 100%;
    float: left;
}
.hotList li{
    position: relative;
    float: left;
    width: 15%;
    height: 48%;
    margin-left: 2%;
    margin-top: 1.8%;
    cursor: pointer;
}
.hotList .first{
    width: 32%;
    height: 100%;
    float: left;
    margin-left: 0;
}
.hotList li img{
    width: 100%;
    height: 100%;
}
.hotList span{
    width: 100%;
    height: 15%;
    background: rgba(0, 0, 0, 0.6);
    border-top:1px solid rgba(34, 31, 31, 0.9) ;
    border-bottom:1px solid rgba(34, 31, 31, 0.9) ;
    position: absolute;
    font-size: 15px;
    bottom: 0;
    left: 0;
    color: rgba(255, 255, 255,0.8);
}
.hotList .sp{
     width: 100%;
    height: 15%px;
    background: rgba(0, 0, 0, 0.6);
    border-top:1px solid rgba(34, 31, 31, 0.9) ;
    border-bottom:1px solid rgba(34, 31, 31, 0.9) ;
    position: absolute;
    font-size: 15px;
    bottom: 0;
    left: 0;
    color: rgba(255, 255, 255,0.8);
}
.hotList li:hover{
    -webkit-box-shadow: #aaa 0 1px 5px;
    box-shadow: 0 1px 5px #aaa;
    opacity: 0.8;
}
</style>