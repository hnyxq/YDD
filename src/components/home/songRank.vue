<template>
  <div class="songRank">
    <el-row class="title">
      <el-col :span="2" :offset="4"><span>排行榜</span></el-col>
      <el-col :span="2" class="hr" ><span @click="rankHandle()"> 更多</span></el-col
      >
      <el-col :span="6"><span style="margin-left: 30px; color:rgb(54, 188, 241)">入驻歌手</span></el-col>
      <el-col :span="6" class="hr"
        ><span @click="singerHandle"> 更多</span></el-col
      >
    </el-row>
    <!-- 排行榜 -->
    <el-row>
      <el-col :span="4" :offset="4">
          <div class="RankList1">
              <div class="imgBox">
                  <img :src="bsbRankList.coverImgUrl" alt="" @click="rankHandle">
                  <ul v-for="(item,index) in bsbRankList.tracks.slice(0,5)" :key="index">
                      <li  @click="songHandle(item)">
                          <span>{{index+1+'.'}}</span>{{item.name}}
                      </li>
                  </ul>
              </div>
              <div class="imgBox">
                  <img :src="hotRankList.coverImgUrl" alt="" @click="rankHandle">
                  <ul  v-for="(item,index) in hotRankList.tracks.slice(0,5)" :key="index">
                      <li @click="songHandle(item)">
                          <span>{{index+1+'.'}}</span>{{item.name}}
                      </li>
                  </ul>
              </div>
              <div class="imgBox">
                  <img :src="newRankList.coverImgUrl" alt="" @click="rankHandle">
                  <ul v-for="(item,index) in newRankList.tracks.slice(0,5)" :key="index">
                      <li  @click="songHandle(item)">
                          <span>{{index+1+'.'}}</span>{{item.name}}
                      </li>
                  </ul>
              </div>
              <div class="imgBox">
                  <img :src="ycRankList.coverImgUrl" alt="" @click="rankHandle">
                  <ul v-for="(item,index) in ycRankList.tracks.slice(0,5)" :key="index">
                      <li @click="songHandle(item)" >
                          <span>{{index+1+'.'}}</span>{{item.name}}
                      </li>
                  </ul>
              </div>
          </div>
      </el-col>
      <!-- 歌手 -->
      <el-col :span="12">
          <div class="singer">
              <ul>
                  <li v-for="(item,index) in this.$store.state.rzSingerList" :key="index">
                      <img :src="item.img1v1Url" alt="" @click="singerDetailHandle(item)">
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
  name: "songRank",
  data() {
    return {
      // 飙升榜列表
      bsbRankList: {},
      // 热歌榜列表
      hotRankList: {},
      // 新歌榜列表
      newRankList: {},
      // 原创榜列表
      ycRankList: {},
    };
  },
  methods: {
      rankHandle(){
          this.$store.state.activeIndex = '/rank'
          this.$router.push({ path:'/rank'})
      },
      songHandle(item){
           window.open(this.$router.resolve({ path:'/songDetail',query:{ id : item.id }}).href,'_new')
      },
     singerHandle(){
          this.$store.state.activeIndex = '/singer'
          this.$router.push({ path:'/singer',query:{area:-1,type:-1,initial:-1}})
      },
      singerDetailHandle(item){
          window.open(this.$router.resolve({ path:'/singerDetail',query:{ id : item.id }}).href,'_blank')
      }
  },
  mounted() {
    this.$api
      .getSongRankList({
        //   飙升榜
        id: 19723756,
      })
      .then((res) => {
        // console.log(res.data.playlist);
        this.bsbRankList = res.data.playlist;
      });

    this.$api
      .getSongRankList({
        //   热歌榜
        id: 3778678,
      })
      .then((res) => {
        // console.log(res.data.playlist);
        this.hotRankList = res.data.playlist;
      });

    this.$api
      .getSongRankList({
        //   新歌榜
        id: 3779629,
      })
      .then((res) => {
        // console.log(res.data.playlist);
        this.newRankList = res.data.playlist;
      });

    this.$api
      .getSongRankList({
        //   原创榜
        id: 2884035,
      })
      .then((res) => {
        // console.log(res.data.playlist);
        this.ycRankList = res.data.playlist;
      });
      this.$api
      .getRzSingerList({
        //   入驻歌手
        cat: 5001,
        limit: 12
      })
      .then((res) => {
        // console.log(res.data.artists);
        this.$store.state.rzSingerList = res.data.artists;
      });
      
  },
};
</script>
<style scoped>
.songRank {
  margin-top: 70px;
}
.title {
  height: 25px;
  font-size: 25px;
  color: #555;
}
.title span {
  color: rgb(32, 207, 149);
}
.hr {
  font-size: 15px;
  text-align: right;
  cursor: pointer;
}
.hr:hover {
  color: rgb(32, 207, 149);
}
/* 排行榜 */
.RankList1{
    width: 100%;
    background: rgb(246, 247, 248);
    border-right: 0;
    margin-top: 20px;
}
.RankList1 .imgBox{
    width: 100%;
    height: 25%;
    background: rgba(219, 217, 214, 0.2);
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    margin-bottom: 10%;
}
.RankList1 .imgBox img{
    width: 45%;
    height: 100%;
    float: left;
    margin-right: 10px;
}
.RankList1 .imgBox li{
    margin-bottom: 5%;
}
/* 歌手 */
.singer{
    width: 100%;
    background: rgb(233, 241, 240);
    margin-top: 20px;
}
.singer  ul{
    list-style-type: none;
}
.singer li{
    float: left;
    width: 15%;
    height:20%;
    margin-left: 10%;
    text-align: center;
    overflow: hidden;
}
.singer li img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
    margin: 20% auto;
}

</style>